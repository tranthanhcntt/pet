// components/VoiceButton.jsx
import React from 'react';

const VoiceButton = ({ text, lang = "Vietnamese Male" }) => {
  const speak = () => {
    if (window.responsiveVoice) {
      console.log('goes here')
      window.responsiveVoice.speak(text, lang);
    } else {
      alert("responsiveVoice chưa sẵn sàng hoặc không được tải.");
    }
  };

  return <button onClick={speak} className='p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>🔊 Đọc</button>;
};

export default VoiceButton;
