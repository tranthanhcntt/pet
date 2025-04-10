import { useState, useEffect } from "react";

export default function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetch("/pet/assets/files/notes.json")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch(() => console.log("No saved notes found"));
  }, []);

  const addNote = () => {
    if (currentNote.trim() === "") return;
    if (editingIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = currentNote;
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, currentNote]);
    }
    setCurrentNote("");
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const editNote = (index) => {
    setCurrentNote(notes[index]);
    setEditingIndex(index);
  };

  const saveToFile = async () => {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: "notes.json",
      types: [{ description: "JSON File", accept: { "application/json": [".json"] } }],
    });
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(notes));
    await writable.close();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Note App</h1>
      <textarea
        className="border p-2 w-full"
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
        placeholder="Write a note..."
      />
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={addNote}>
        {editingIndex !== null ? "Update Note" : "Add Note"}
      </button>
      <button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={saveToFile}>
        Save to File
      </button>
      <ul className="mt-4">
        {notes.map((note, index) => (
          <li key={index} className="border p-2 my-2 flex justify-between max-w-lg">
            <div className="max-w-lg" style={{inlineSize: '23rem', overflowWrap: 'break-word'}}>{note}</div>
            <div>
              <button className="text-blue-500 mr-2" onClick={() => editNote(index)}>
                Edit
              </button>
              <button className="text-red-500" onClick={() => deleteNote(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}