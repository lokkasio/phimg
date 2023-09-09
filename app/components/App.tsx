import { GitHub } from "react-feather";
import { Header } from "./header/Header";
import { Toolbar } from "./toolbar/Toolbar";
import { Result } from "./result/Result";
import { placeholderSearchParams } from "./result/placeholderSearchParms";
import style from "./App.module.css";

export const App = () => {
  return (
    <>
      <Header
        logo="phimg"
        navItems={[
          {
            label: "MSW Demo",
            href: `demo.html#!${placeholderSearchParams.value}`,
          },
          {
            // @ts-expect-error
            label: <GitHub size={16} />,
            href: "https://github.com/lokkasio/phimg",
            title: "Source code on GitHub",
          },
        ]}
      />
      <div className="content">
        <Toolbar />
        <Result className={style.result} />
      </div>
    </>
  );
};
