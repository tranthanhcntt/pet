import React, { useState, useEffect } from 'react';
import { Button } from "@/components/atoms/ui/button";
import { Textarea } from "@/components/atoms/ui/textarea";

const Interview = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetch("/assets/files/interview.json")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          randomQuestion(data.questions);
        }
      })
      .catch(error => console.error('Error fetching the interview questions:', error));
  }, []);

  // Random Question
  const randomQuestion = (questionsPassed) => {
    const questionsLoaded = questionsPassed || questions;
    const randomIndex = Math.floor(Math.random() * questionsLoaded.length);

    setQuestion(questionsLoaded[randomIndex]);
    textToSpeech(questionsLoaded[randomIndex]);
  }


  const textToSpeech = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const handleSpeechToText = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
      setAnswer(event.results[0][0].transcript);
    };
    recognition.start();
  };

  return (
    <div className='flex flex-col flex-wrap justify-center max-w-2xl mx-auto list-jp'>
      <h1>Interview Question</h1>
      <div className='flex flex-col'>
        <div className='flex mb-4'>
          <p>{question}</p>
          <Button className='w-32 ml-2' onClick={() => randomQuestion()}>Next Question</Button>
        </div>
        <Button className="mb-1" onClick={handleSpeechToText}>Answer with Speech</Button>
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here"
        />
      </div>
    </div>
  );
};

export default Interview;