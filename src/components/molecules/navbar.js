import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import Craiyon from "@/assets/images/craiyon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    {path: "/pet", label: "Learn JP", submenu: [
      { path: "/pet", label: "Search(JP)" },
      { path: "/pet/quiz", label: "Quiz(JP)" },
      { path: "/pet/list", label: "List(JP)" },
    ]},
    { path: "/pet/contact", label: "Contact" },
    { path: "/pet/image-to-text", label: "Img 2 Text" },
    { path: "/pet/interview", label: "Interview" },
    { path: "/pet/note", label: "Note" },
    { path: "/pet/wheel", label: "Wheel" },
    { path: "/pet/werewolves", label: "Were Wolves" },
  ];

  return (
    <nav className="w-full bg-white shadow-md mb-4">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          <img src={Craiyon} alt="Logo" style={{ marginRight: "8px", height: '40px' }} />
        </Link>
        <ul className="hidden md:flex space-x-6">
          {navLinks.map(({ path, label, submenu }) => (
            <li key={path} className="relative group">
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
              {submenu && (
                <ul className="absolute left-0 mt-1 bg-white shadow-lg border border-gray-200 rounded-lg hidden group-hover:block">
                  {submenu.map(({ path: subPath, label: subLabel }) => (
                    <li key={subPath}>
                      <Link
                        to={subPath}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        {subLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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
          {navLinks.map(({ path, label, submenu }) => (
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
              {submenu && (
                <ul className="pl-4">
                  {submenu.map(({ path: subPath, label: subLabel }) => (
                    <li key={subPath}>
                      <Link
                        to={subPath}
                        onClick={() => setIsOpen(false)}
                        className="block px-6 py-2 text-gray-700 hover:bg-gray-200"
                      >
                        {subLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
