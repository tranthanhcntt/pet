import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import Craiyon from "@/assets/images/craiyon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "Search(JP)" },
    { path: "/quiz", label: "Quiz(JP)" },
    { path: "/list", label: "List(JP)" },
    { path: "/contact", label: "Contact" },
    { path: "/image-to-text", label: "Img 2 Text" },
    { path: "/interview", label: "Interview" },
    { path: "/note", label: "Note" },
    { path: "/wheel", label: "Wheel" },
  ];

  return (
    <nav className="w-full bg-white shadow-md mb-4">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
        <img src={Craiyon} alt="Logo" style={{ marginRight: "8px", height: '40px' }}/>
        </Link>
        <ul className="hidden md:flex space-x-6">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`px-4 py-2 rounded-lg transition ${
                  location.pathname === path
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white border-t border-gray-200 py-2">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                onClick={() => setIsOpen(false)}
                className={`block px-6 py-3 ${
                  location.pathname === path
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
