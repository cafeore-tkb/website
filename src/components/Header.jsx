import { useEffect, useState } from "react";
import CafeoreLogo from "./CafeoreLogo";
import HamburgerMenu from "./HamburgerMenu";
import "../assets/css/header.css";

export default function InteractiveHeader({ isOverlay = true }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const body = document.body;
    body.classList.toggle("menu-expanded", isMenuOpen);

    const handleEsc = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      body.classList.remove("menu-expanded");
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`header ${isMenuOpen ? "expanded" : ""} ${
          isOverlay ? "is-overlay" : "is-static"
        }`}
      >
        <div className="header-row">
          <div className="header-left">
            <a href="/" className="logo">
              <CafeoreLogo className="logo-svg" />
            </a>
          </div>

          <nav className="header-nav desktop-nav">
            <ul>
              <li>
                <a href="/about">ABOUT</a>
              </li>
              <li>
                <a href="/articles">NEWS</a>
              </li>
              <li>
                <a href="/links">LINKS</a>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            className="hamburger-button mobile-only"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <HamburgerMenu className="hamburger-svg" />
          </button>
        </div>

        <div
          className="mobile-menu"
          style={{ maxHeight: isMenuOpen ? "500px" : "0" }}
        >
          {["about", "news", "links"].map((item) => (
            <div key={item} className="mobile-menu-item">
              <a
                href={`/${item}`}
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.toUpperCase()}
              </a>
            </div>
          ))}
        </div>
      </header>
    </>
  );
}
