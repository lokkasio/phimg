import { FunctionComponent } from "preact";
import { computed } from "@preact/signals";
import { alphaHex } from "src/lib";
import { sessionSignal } from "app/sessionSignal";
import formStyle from "../index.module.css";
import { Input } from "../input/Input";

const bgColor = sessionSignal("bg_color", "#e9ecef");
const bgOpacity = sessionSignal("bg_opacity", 100);
export const backgroundColor = computed(
  () => bgColor.value.slice(1) + alphaHex(bgOpacity.value)
);

export const BackgroundColorInput: FunctionComponent = () => (
  <div className={formStyle.grid}>
    <Input label="Background Color">
      <input
        type="color"
        value={bgColor}
        onInput={(event) => {
          bgColor.value = (event.target as HTMLInputElement).value;
        }}
      />
    </Input>

    <Input label="Background Opacity">
      <input
        type="range"
        min={0}
        max={100}
        value={bgOpacity}
        onInput={(event) => {
          bgOpacity.value = Number((event.target as HTMLInputElement).value);
        }}
      />
    </Input>
  </div>
);
