import React from 'react';
import { FLASHCARDSCONST } from "@/constants";

const ListJP = () => {
  const flashcards = [...FLASHCARDSCONST];

  return (

    <div className='flex flex-wrap justify-center max-w-2xl mx-auto list-jp'>
      <div className='flex flex-wrap align-center justify-between'>
        {flashcards.map((flashcard, index) => (
        <ul>
          <li key={index} className='flex flex-wrap text-center border-2 border-gray-300 p-1 justify-center'>
            <h4 className='text-sky-700'>{flashcard.hiragana}</h4>
            <h4>{flashcard.katakana}</h4>
            <p className='w-full'>{flashcard.romanji.replace(/\s*\(.*?\)/g, "")}</p>
          </li>
        </ul>
        ))}
      </div>
    </div>
  );
};

export default ListJP;

