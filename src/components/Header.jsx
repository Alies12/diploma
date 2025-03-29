import { useState, useRef, useEffect } from "react";
import Navigation from "./Navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen)
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    console.log(isMenuOpen)
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <h1>Детский Центр "Солнышко"</h1>
      </div>
      <button
        ref={hamburgerRef}
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Меню"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Navigation isOpen={isMenuOpen} onClose={closeMenu} ref={menuRef} />
    </header>
  );
};

export default Header;