import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Wheel from "@/pages/Wheel";
import NoteApp from "@/pages/Notes";
import ListJP from "@/pages/ListJP";
import Contact from "@/pages/Contact";
import Interview from "@/pages/Interview";
import ImageToText from "@/pages/ImageToText";

import Navbar from "@/components/molecules/navbar";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/list" element={<ListJP />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/image-to-text" element={<ImageToText />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/note" element={<NoteApp />} />
          <Route path="/wheel" element={<Wheel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;