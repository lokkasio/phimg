import { Header } from "./header/Header";
import { Toolbar } from "./toolbar/Toolbar";
import { Result } from "./result/Result";
import style from "./App.module.css";

export const App = () => {
  return (
    <>
      <Header />
      <div className="content">
        <Toolbar />
        <Result className={style.result} />
      </div>
    </>
  );
};
