import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FLASHCARDSCONST } from "../constants";

export default function FlashcardApp() {
  const flashcards = FLASHCARDSCONST;
  const [index, setIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const nextCard = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  }, [flashcards.length]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === "Enter") {
      nextCard();
    }
  }, [nextCard]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredCards = flashcards.filter(
    (card) =>
      card.hiragana.includes(searchTerm) ||
      card.romanji.includes(searchTerm) ||
      card.katakana.includes(searchTerm)
  );
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4"  style={{textAlign: 'center'}} >
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="px-4 py-2 border rounded-lg"
      />
      {filteredCards.length > 0 ? (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 text-center bg-white shadow-lg rounded-2xl">
            <h1 className="text-6xl font-bold">{filteredCards[index % filteredCards.length].hiragana}</h1>
            <p className="text-lg mt-2">{filteredCards[index % filteredCards.length].romanji}</p>
            <p className="text-sm text-gray-500">{filteredCards[index % filteredCards.length].katakana}</p>
          </div>
        </motion.div>
      ) : (
        <p className="text-gray-500">No results found</p>
      )}
      <button onClick={nextCard} className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Next
      </button>
    </div>
  );
}
 