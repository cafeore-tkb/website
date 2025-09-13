import { useState, type FunctionComponent, type ReactNode } from "react";
import styles from "./Header.module.css";

export interface HeaderProps {
  children: ReactNode;
}

export const Header: FunctionComponent<HeaderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <a className={styles.topLink} href="/">
        {children}
      </a>
      <button
        className={styles.button}
        type="button"
        onClick={() => setOpen((o) => !o)}
      >
        {children}
      </button>
      <nav className={`${styles.navigation} ${open ? styles.open : ""}`}>
        <ul className={styles.linkList}>
          <li className={styles.linkItem}>
            <a className={`${styles.link} ${styles.top}`} href="/">
              TOP
            </a>
          </li>
          <li className={styles.linkItem}>
            <a className={styles.link} href="/about">
              ABOUT
            </a>
          </li>
          <li className={styles.linkItem}>
            <a className={styles.link} href="/articles">
              NEWS
            </a>
          </li>
          <li className={styles.linkItem}>
            <a className={styles.link} href="/links">
              LINKS
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
