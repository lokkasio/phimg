import { clsx } from "clsx";
import { GitHub } from "react-feather";
import style from "./Header.module.css";

export const Header = () => (
  <header className={style._}>
    <div className={clsx(style.inner, "content")}>
      <a href="./" className={style.logo}>
        phimg
      </a>
      <nav className={style.nav}>
        <a
          href="https://github.com/lokkasio/phimg"
          className={style.navLink}
          title="Source code on GitHub"
        >
          <GitHub size={16} />
        </a>
      </nav>
    </div>
  </header>
);
