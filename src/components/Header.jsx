import { useEffect, useState } from "react";
import CafeoreLogo from "./CafeoreLogo";
import HamburgerMenu from "./HamburgerMenu";

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

  const handleMobileMenuClick = () => setIsMenuOpen(false);

  const headerStyles = `
		:root {
			--primary-color: var(--header-text-color, #006367); 
			--primary-hover: #004d4f;
			--transition: 0.3s ease;
		}

		.header {
			font-family: "Helvetica Neue", Arial, sans-serif;
			top: 0;
			left: 0;
			width: 95%;
			padding: 1rem;
			z-index: 1000;
			transition: transform 0.4s ease-out, opacity 0.3s ease-out;
		}

		.header.is-overlay {
			position: fixed;
		}
		.header.is-static {
			position: relative;
		}

		.header-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			min-height: 4rem;
		}

		.header-left {
			margin-right: auto;
		}

		.logo {
			color: var(--primary-color);
			text-decoration: none;
		}

		.logo-svg {
			height: 4rem;
			padding-left: 0.5rem;
			display: block;
			width: auto;
		}

		.header-nav ul {
			display: flex;
			list-style: none;
			gap: 3rem;
			margin: 0 3rem 0 0;
			padding: 0;
		}

		.header-nav a {
			text-decoration: none;
			font-weight: bold;
			font-size: 1.3rem;
			color: var(--primary-color);
			transition: color var(--transition);
		}
		.header-nav a:hover {
			color: var(--primary-hover);
		}

		.hamburger-button {
			background: none;
			border: none;
			cursor: pointer;
			padding: 0.8rem;
			margin-top: 0.4rem;
			display: none;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			transition: background-color 0.3s ease, transform 0.2s ease;
			color: var(--primary-color);
		}

		.hamburger-button:hover {
			background-color: rgba(0, 99, 103, 0.1);
			transform: scale(1.1);
		}

		.hamburger-svg {
			width: 3rem;
			height: 3rem;
			transition: transform 0.3s ease;
		}

		.header.expanded .hamburger-svg {
			transform: rotate(90deg);
		}

		.mobile-menu {
			width: 100%;
			max-height: 0;
			overflow: hidden;
			transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
			display: none;
		}
		
		.mobile-menu-item { 
			display: flex; 
			justify-content: center; 
			padding: 0.8rem 0; 
			border-bottom: 1px solid rgba(0, 99, 103, 0.1); 
		}
		.mobile-menu-item:last-child { 
			border-bottom: none; 
			padding-bottom: 1rem; 
		}
		.mobile-menu-link { 
			text-decoration: none; 
			color: var(--primary-color); 
			font-size: 1.4rem;
			font-weight: bold;
			padding: 0.8rem 2rem; 
			transition: color var(--transition), background-color var(--transition), transform 0.2s ease; 
			border-radius: 25px; 
			text-align: center; 
		}
		.mobile-menu-link:hover { 
			color: var(--primary-hover); 
			background-color: rgba(0, 99, 103, 0.15); 
			transform: scale(1.05); 
		}

		@media (max-width: 768px) {
			.mobile-only {
				display: flex !important;
			}
			.desktop-nav {
				display: none !important;
			}
			.logo-svg {
				padding-top: 0rem;
				height: 5rem;
			}
			.mobile-menu {
				display: block;
			}
		}

		@media (min-width: 769px) {
			.mobile-only {
				display: none !important;
			}
		}
	`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: headerStyles }} />
      <header
        className={`header ${isMenuOpen ? "expanded" : ""} ${isOverlay ? "is-overlay" : "is-static"}`}
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
                <a href="/news">NEWS</a>
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
                onClick={handleMobileMenuClick}
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
