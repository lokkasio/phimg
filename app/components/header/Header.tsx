import { FunctionComponent, JSX, ComponentChild } from "preact";
import { clsx } from "clsx";

export const Header: FunctionComponent<{
  logo: ComponentChild;
  navItems: ({
    label: ComponentChild;
  } & JSX.HTMLAttributes<HTMLAnchorElement>)[];
}> = ({ logo, navItems, ...props }) => (
  <header className="header" {...props}>
    <div className="header__inner content">
      <a href="./" className="header__logo">
        {logo}
      </a>
      <nav className="header__nav">
        {navItems.map(({ label, className, href, ...props }) => (
          <a
            href={href}
            key={href}
            className={clsx("header__navLink", className)}
            {...props}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  </header>
);
