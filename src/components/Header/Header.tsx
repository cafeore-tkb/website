import { useState, type FunctionComponent, type ReactNode } from "react";
import "./Header.css";

export interface HeaderProps {
  children: ReactNode;
}

export const Header: FunctionComponent<HeaderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <a className="top-link" href="/">
        {children}
      </a>
      <button
        className="button"
        type="button"
        onClick={() => setOpen((o) => !o)}
      >
        {children}
      </button>
      <nav className={`navigation ${open ? "open" : ""}`}>
        <ul className="link-list">
          <li className="link-item">
            <a className="link top" href="/">
              TOP
            </a>
          </li>
          <li className="link-item">
            <a className="link" href="/about">
              ABOUT
            </a>
          </li>
          <li className="link-item">
            <a className="link" href="/articles">
              NEWS
            </a>
          </li>
          <li className="link-item">
            <a className="link" href="/links">
              LINKS
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
