import React, { useEffect, useState } from "react";
import usePersistentState from "@/hooks/usePersistentState";
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { Select, SelectItem } from "@/components/atoms/ui/select";
import { Card, CardContent } from "@/components/atoms/ui/card";
import { Textarea } from "@/components/atoms/ui/textarea";
import { NarrationBox } from "@/components/molecules/NarrationBox";
import clsx from "clsx";
import PropTypes from "prop-types";

const roles = {
  "Sói": "Giết người mỗi đêm",
  "Tiên tri": "Xem vai trò của 1 người mỗi đêm",
  "Bảo vệ": "Bảo vệ 1 người mỗi đêm",
  "Phù thủy": "Có thuốc cứu và thuốc độc (1 lần mỗi loại)",
  "Thợ săn": "Khi chết có thể bắn 1 người",
  "Dân": "Không có năng lực",
};

const phaseDescriptions = [
  "🌙 Đêm: Ma Sói thức dậy",
  "🔮 Đêm: Tiên tri kiểm tra 1 người",
  "🛡️ Đêm: Bảo vệ chọn bảo vệ",
  "🌞 Sáng: Công bố người chết",
  "🗳️ Ngày: Thảo luận và bỏ phiếu",
];
export const ModeratorView = ({ players, setPlayers, phase, setPhase }) => {
  const [newName, setNewName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [eventLog, setEventLog] = usePersistentState("ww_eventLog", []);
  const [sortByRole, setSortByRole] = useState(false);
  const [hideDeadInDay, setHideDeadInDay] = useState(true);

  const isNight = phase <= 2;

  const logEvent = (message) => {
    setEventLog((prev) => [`🕒 ${new Date().toLocaleTimeString()} - ${message}`, ...prev]);
  };

  const addOrEditPlayer = () => {
    if (!newName.trim()) return;
    if (editingIndex !== null) {
      const updated = [...players];
      const oldName = updated[editingIndex].name;
      updated[editingIndex].name = newName;
      setPlayers(updated);
      logEvent(`✏️ Đổi tên ${oldName} thành ${newName}`);
      setEditingIndex(null);
    } else {
      setPlayers([
        ...players,
        { name: newName, role: "Dân", alive: true, powerUsed: false },
      ]);
      logEvent(`➕ Thêm người chơi: ${newName}`);
    }
    setNewName("");
  };

  const updateRole = (index, role) => {
    const updated = [...players];
    updated[index].role = role;
    updated[index].powerUsed = false;
    setPlayers(updated);
    logEvent(`🎭 Cập nhật vai trò ${updated[index].name} => ${role}`);
  };

  const deletePlayer = (index) => {
    const name = players[index].name;
    setPlayers(players.filter((_, i) => i !== index));
    logEvent(`🗑️ Xoá người chơi: ${name}`);
  };

  const toggleAlive = (index) => {
    const updated = [...players];
    updated[index].alive = !updated[index].alive;
    setPlayers(updated);
    logEvent(`${updated[index].name} ${updated[index].alive ? "💚 hồi sinh" : "💀 bị giết"}`);
  };

  const togglePowerUsed = (index) => {
    const updated = [...players];
    updated[index].powerUsed = !updated[index].powerUsed;
    setPlayers(updated);
    logEvent(`${updated[index].name} ${updated[index].powerUsed ? "⚡ đã dùng quyền năng" : "✨ reset quyền năng"}`);
  };

  const startEdit = (index) => {
    setNewName(players[index].name);
    setEditingIndex(index);
  };

  useEffect(() => {console.log(players)}, [players]);

  let visiblePlayers = players;

  if (isNight) {
    visiblePlayers = visiblePlayers.filter((p) =>
      ["Sói", "Tiên tri", "Bảo vệ", "Phù thủy"].includes(p.role)
    );
  }

  if (!isNight && hideDeadInDay) {
    visiblePlayers = visiblePlayers.filter((p) => p.alive);
  }

  if (sortByRole) {
    visiblePlayers = [...visiblePlayers].sort((a, b) => a.role.localeCompare(b.role));
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between items-center flex-col mb-1">
            <h2 className="text-xl font-bold mb-1">📜 Giai đoạn: {phaseDescriptions[phase % phaseDescriptions.length]}</h2>
            <NarrationBox phase={phase} />
            <Button onClick={() => setPhase((prev) => (prev + 1) % phaseDescriptions.length)}>➡️ Tiếp tục</Button>
          </div>
          <div className="flex gap-2">
            <Button variant={sortByRole ? "default" : "outline"} onClick={() => setSortByRole((p) => !p)}>📂 Sắp theo vai trò</Button>
            {!isNight && (
              <Button variant={hideDeadInDay ? "default" : "outline"} onClick={() => setHideDeadInDay((v) => !v)}>
                {hideDeadInDay ? "👻 Hiện người chết" : "🙈 Ẩn người chết"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold mb-2">👥 Người chơi</h2>
          <div className="flex gap-2">
            <Input
              value={newName}
              placeholder="Tên người chơi"
              onChange={(e) => setNewName(e.target.value)}
            />
            <Button onClick={addOrEditPlayer}>
              {editingIndex !== null ? "✅ Cập nhật" : "➕ Thêm"}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            {(Array.isArray(visiblePlayers) && visiblePlayers.length > 0) && visiblePlayers.map((player) => {
              const fullIdx = players.findIndex((p) => p.name === player.name);
              return (
                <div key={player.name} className="border p-3 rounded-lg bg-white shadow">
                  <div className="flex justify-between">
                    <h3
                      className={clsx("text-lg font-bold", !player.alive && "line-through text-red-500")}
                    >
                      {player.name}
                    </h3>
                    <div className="space-x-1 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => startEdit(fullIdx)} className="w-auto ml-0">✏️</Button>
                      <Button variant="destructive" size="sm" onClick={() => deletePlayer(fullIdx)} className="w-auto">🗑️</Button>
                    </div>
                  </div>

                  <div className="mt-2">
                    <label htmlFor={`role-select-${player.name}`} className="text-sm font-medium">🎭 Vai trò:</label>
                    <Select id={`role-select-${player.name}`} value={player.role} onValueChange={(val) => updateRole(fullIdx, val)}>
                      {Object.keys(roles)?.map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </Select>
                  </div>

                  <p className="text-sm mt-2">🧠 <strong>Quyền năng:</strong> {roles[player.role]}</p>

                  <div className="flex justify-between mt-2 flex-col">
                    <Button size="sm" variant="secondary" onClick={() => toggleAlive(fullIdx)} className="mb-2">
                      {player.alive ? "💀 Đánh dấu chết" : "💚 Hồi sinh"}
                    </Button>
                    {roles[player.role] !== "Không có năng lực" && (
                      <Button
                        size="sm"
                        variant={player.powerUsed ? "destructive" : "outline"}
                        onClick={() => togglePowerUsed(fullIdx)}
                      >
                        {player.powerUsed ? "⚡ Đã dùng" : "✨ Chưa dùng"}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2 flex-col">
            <h2 className="text-lg font-semibold">📘 Log diễn biến</h2>
            <Button variant="destructive" size="sm" onClick={() => setEventLog([])}>
              🧹 Xoá nhật ký
            </Button>
          </div>
          <Textarea className="w-full h-48" readOnly value={eventLog.join("\n")} />
        </CardContent>
      </Card>
    </div>
  );
}
ModeratorView.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      alive: PropTypes.bool.isRequired,
      powerUsed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setPlayers: PropTypes.func.isRequired,
  phase: PropTypes.number.isRequired,
  setPhase: PropTypes.func.isRequired,
};

export default ModeratorView;
