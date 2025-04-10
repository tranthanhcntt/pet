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
          <Route path="/pet" element={<Home />} />
          <Route path="/pet/quiz" element={<Quiz />} />
          <Route path="/pet/list" element={<ListJP />} />
          <Route path="/pet/contact" element={<Contact />} />
          <Route path="/pet/image-to-text" element={<ImageToText />} />
          <Route path="/pet/interview" element={<Interview />} />
          <Route path="/pet/note" element={<NoteApp />} />
          <Route path="/pet/wheel" element={<Wheel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;