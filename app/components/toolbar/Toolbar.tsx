import { clsx } from "clsx";
import { Maximize2, Image, Type } from "react-feather";
import { sessionSignal } from "app/sessionSignal";
import { BackgroundFieldset } from "../form/BackgroundFieldset";
import { SizeFieldset } from "../form/SizeFieldset";
import { TextFieldset } from "../form/TextFieldset";
import style from "./Toolbar.module.css";

type ActiveTab = "size" | "background" | "text";
const activeTab = sessionSignal<ActiveTab | undefined>(
  "toolbar_activeTab",
  "size"
);

const buttons = [
  { icon: <Maximize2 />, label: "Size", value: "size" as const },
  { icon: <Image />, label: "Background", value: "background" as const },
  { icon: <Type />, label: "Text", value: "text" as const },
];

export const Toolbar = () => (
  <aside className={style._}>
    <div
      className={style.menu}
      style={{
        "--button-group-count": buttons.length,
      }}
    >
      {buttons.map(({ icon, label, value }) => (
        <button
          key={value}
          value={value}
          className={style.menuButton}
          aria-pressed={value === activeTab.value}
          onClick={() => {
            activeTab.value = value === activeTab.value ? undefined : value;
          }}
          title={label}
          type="button"
        >
          {icon}
          <span className="visuallyHidden">{label}</span>
        </button>
      ))}
    </div>
    <div>
      <SizeFieldset
        id="toolbar-size-fieldset"
        className={clsx(
          style.fieldset,
          activeTab.value === "size" && style.fieldsetActive
        )}
      />
      <BackgroundFieldset
        id="toolbar-background-fieldset"
        className={clsx(
          style.fieldset,
          activeTab.value === "background" && style.fieldsetActive
        )}
      />
      <TextFieldset
        id="toolbar-text-fieldset"
        className={clsx(
          style.fieldset,
          activeTab.value === "text" && style.fieldsetActive
        )}
      />
    </div>
  </aside>
);
