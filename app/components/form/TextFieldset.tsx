import { FunctionComponent } from "preact";
import { effect } from "@preact/signals";
import { sessionSignal } from "app/sessionSignal";
import { RadioGroup } from "./radio-group/RadioGroup";
import { width, height } from "./SizeFieldset";
import formStyle from "./index.module.css";
import { Input } from "./input/Input";

const textType = sessionSignal<"size" | "custom" | "none">("text_type", "size");

export const text = sessionSignal(
  "text_text",
  `${width.value}×${height.value}`
);
export const textColor = sessionSignal("text_color", "#495057");
export const textOpacity = sessionSignal("text_opacity", 100);

effect(() => {
  if (textType.value === "size") {
    text.value = `${width.value}×${height.value}`;
  }
});

export const TextFieldset: FunctionComponent<{
  id?: string;
  className?: string;
  hidden?: boolean;
}> = (props) => (
  <fieldset {...props}>
    <legend>Text</legend>

    <RadioGroup
      name="textType"
      signal={textType}
      options={[
        { label: "Size", value: "size" },
        { label: "Custom", value: "custom" },
        { label: "None", value: "none" },
      ]}
    />

    <hr />

    <div hidden={textType.value === "none"}>
      <div className={formStyle.grid}>
        <Input label="Text">
          <input
            type="text"
            value={text}
            onInput={(event) => {
              text.value = (event.target as HTMLInputElement).value;
            }}
            disabled={textType.value !== "custom"}
          />
        </Input>

        <Input label="Text Color">
          <input
            type="color"
            value={textColor}
            onInput={(event) => {
              textColor.value = (event.target as HTMLInputElement).value;
            }}
          />
        </Input>

        <Input label="Text Opacity">
          <input
            type="range"
            min={0}
            max={100}
            value={textOpacity}
            onInput={(event) => {
              textOpacity.value = Number(
                (event.target as HTMLInputElement).value
              );
            }}
          />
        </Input>
      </div>
    </div>
  </fieldset>
);
