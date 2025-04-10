import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FLASHCARDSCONST } from "../constants";

const FlashcardQuiz = () => {
  const flashcards = [...FLASHCARDSCONST];
  const getRange = (arr, start, end) => arr.slice(start, end + 1);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [learnRange, setLearnRange] = useState([10, 14]);
  const newFlashCards = getRange(flashcards, learnRange[0], learnRange[1]);
  const [index, setIndex] = useState(Math.floor(Math.random() * newFlashCards.length));
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value.toLowerCase());
  };

  const nextCard = useCallback(() => {
    setUserAnswer("");
    setIsCorrect(null);
    setShowAnswer(false);
    setIndex(Math.floor(Math.random() * newFlashCards.length)); // Pick a new random card
  }, [newFlashCards.length]);

  const speak = useCallback(() => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(newFlashCards[index].hiragana.toLowerCase());
      utterance.lang = "ja-JP";
      speechSynthesis.speak(utterance);
    } else {
      alert("Trình duyệt không hỗ trợ Text-to-Speech!");
    }
  }, [newFlashCards[index].hiragana.toLowerCase()]);

  const checkAnswer = useCallback(() => {
    const isAnswerCorrect = userAnswer === newFlashCards[index].romanji.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    speak();
    if (isAnswerCorrect) {
      setCorrectAnswers((prev) => {
        const newCorrectAns = [...prev, newFlashCards[index]];
        return Array.from(new Set(newCorrectAns.map(a => a.hiragana)))
          .map(hiragana => newCorrectAns.find(a => a.hiragana === hiragana));
      });
    } else {
      setWrongAnswers((prev) => {
        const newWrongAnswers = [...prev, newFlashCards[index]];
        return Array.from(new Set(newWrongAnswers.map(a => a.hiragana)))
          .map(hiragana => newWrongAnswers.find(a => a.hiragana === hiragana));
      });
      setShowAnswer(true);
    }
    setTimeout(() => {
      nextCard();
    }, 1500); // Move to the next card after 1 second
  }, [userAnswer, newFlashCards, index, nextCard]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === "Enter") {
      checkAnswer();
    }
  }, [checkAnswer]);

  const updateRange = (isStart, val) => {
    if (isStart) {
      setLearnRange([val, learnRange[1]]);
      updateIndex(val, learnRange[1]);
    } else {
      setLearnRange([learnRange[0], val]);
      updateIndex(learnRange[0], val);
    }
  };

  const updateIndex = (start, end) => {
    if (start >= end) {
      setIndex(0);
    } else if (index > end - start) {
      setIndex(end - start);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [userAnswer, handleKeyPress, index, newFlashCards]);

  return (
    <div className="flex flex-col items-center justify-center gap-4" style={{ textAlign: "center" }}>
      <div className="flex items-center justify-center gap-4 mb-4">
        Range: 
        <input
          type="number"
          placeholder="Start Index"
          value={learnRange[0]}
          onChange={(e) => updateRange(true, parseInt(e.target.value) || 0)}
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="End Index"
          value={learnRange[1]}
          onChange={(e) => updateRange(false, parseInt(e.target.value) || 0)}
          className="px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="flex w-screen" style={{ height: "80vh" }}>
        <div className="flex flex-col items-center justify-center gap-4 mb-12">
          <h2 className="text-2xl font-bold">Correct Answers({correctAnswers.length})</h2>
          <ul className="list-disc">
            {correctAnswers.map((card, idx) => (
              <li key={idx} className="text-green-500">{card.hiragana} - {card.romanji}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 mb-12 mx-auto">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 text-center bg-white shadow-lg rounded-2xl">
              <h1 className="text-6xl font-bold">{newFlashCards[index]?.hiragana}</h1>
              <p className="text-sm text-gray-500">{newFlashCards[index]?.katakana}</p>
              {showAnswer && <p className="text-sm text-gray-500">{newFlashCards[index]?.romanji}</p>}
            </div>
          </motion.div>
          <input
            type="text"
            placeholder="Type the Romanji..."
            value={userAnswer}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded-lg"
          />
          <div style={{ height: "40px" }}>
            {isCorrect === true && <p className="text-green-500">✅ Correct! Moving to next...</p>}
            {isCorrect === false && <p className="text-red-500">❌ Incorrect! Try again.</p>}
          </div>
          <button
            onClick={checkAnswer}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 mb-12">
          <h2 className="text-2xl font-bold">Wrong Answers({wrongAnswers.length})</h2>
          <ul className="list-disc">
            {wrongAnswers.map((card, idx) => (
              <li key={idx} className="text-red-500">{card.hiragana} - {card.romanji}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlashcardQuiz;