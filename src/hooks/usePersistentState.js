import { useState, useEffect } from "react";

export const usePersistentState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.warn("⚠️ Lỗi khi đọc localStorage:", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn("⚠️ Lỗi khi lưu localStorage:", error);
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;
