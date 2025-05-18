// NarrationBox.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import narrationLines from '@/hooks/narrationLines';
import VoiceButton from '@/components/atoms/VoiceButton';
import { Button } from "@/components/atoms/ui/button";

export const NarrationBox = ({ phase }) => {
  const [line, setLine] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (narrationLines[phase]) {
      const options = narrationLines[phase];
      const randomLine = options[Math.floor(Math.random() * options.length)];
      setLine(randomLine);
      if (soundEnabled) {
        const sound = new Audio(`/pet/assets/sounds/${phase}.mp3`);
        sound.play().catch((err) => {
          console.warn("Unable to play sound:", err);
        });
      }
    } else {
      setLine('🕹️ Chờ giai đoạn tiếp theo...');
    }
  }, [phase]);

  return (
    <div className="p-4 bg-black text-white rounded-xl shadow-lg text-lg max-w-xl mx-auto mt-2 mb-2">
      <p className='mb-2'>{line}</p>
      <button 
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="w-auto p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mr-2"
      >
        {soundEnabled ? "🔊 Tắt âm" : "🔈 Bật âm"}
      </button>
      <VoiceButton text={line} />
    </div>
  );
};
NarrationBox.propTypes = {
  phase: PropTypes.string.isRequired,
};

export default NarrationBox;
