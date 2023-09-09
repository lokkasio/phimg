import { FunctionComponent } from "preact";
import { sessionSignal } from "app/sessionSignal";
import { bgType } from "./BackgroundFieldset";
import formStyle from "./index.module.css";
import { Input } from "./input/Input";

export const width = sessionSignal("size_width", 500);
export const height = sessionSignal("size_height", 300);

export const SizeFieldset: FunctionComponent<{
  id?: string;
  className?: string;
  hidden?: boolean;
}> = (props) => (
  <fieldset {...props} disabled={bgType.value === "image"}>
    <legend>Size</legend>
    <div className={formStyle.grid}>
      <Input label="Width">
        <input
          type="number"
          inputMode="numeric"
          value={width}
          onInput={(event) => {
            width.value = Number((event.target as HTMLInputElement).value);
          }}
          min={1}
          required
        />
      </Input>

      <Input label="Height">
        <input
          type="number"
          inputMode="numeric"
          id="size-height"
          value={height}
          onInput={(event) => {
            height.value = Number((event.target as HTMLInputElement).value);
          }}
          min={1}
          required
        />
      </Input>
    </div>
  </fieldset>
);
