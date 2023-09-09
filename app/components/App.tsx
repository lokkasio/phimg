import { computed } from "@preact/signals";
import { Header } from "./header/Header";
import { Toolbar } from "./toolbar/Toolbar";
import { Result } from "./result/Result";
import { placeholderUrl } from "./result/PlaceholderSwUrl";
import style from "./App.module.css";

const demoSearchParams = computed(() =>
  new URL(placeholderUrl.value, location.origin).searchParams.toString()
);

export const App = () => {
  return (
    <>
      <Header
        logo="phimg"
        navItems={[
          {
            label: "MSW Demo",
            href: `demo.html#!${demoSearchParams.value}`,
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
