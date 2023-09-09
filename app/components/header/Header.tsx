import { FunctionComponent, JSX, ComponentChild } from "preact";
import { clsx } from "clsx";
import style from "./Header.module.css";

export const Header: FunctionComponent<{
  logo: ComponentChild;
  navItems: ({
    label: ComponentChild;
  } & JSX.HTMLAttributes<HTMLAnchorElement>)[];
}> = ({ logo, navItems, ...props }) => (
  <header className={style._} {...props}>
    <div className={clsx(style.inner, "content")}>
      <a href="./" className={style.logo}>
        {logo}
      </a>
      <nav className={style.nav}>
        {navItems.map(({ label, className, href, ...props }) => (
          <a
            href={href}
            key={href}
            className={clsx(style.navLink, className)}
            {...props}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  </header>
);
