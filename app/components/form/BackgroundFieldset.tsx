import { FunctionComponent } from "preact";
import { effect, signal } from "@preact/signals";
import { sessionSignal } from "app/sessionSignal";
import { RadioGroup } from "./radio-group/RadioGroup";
import {
  BackgroundColorInput,
  backgroundColor,
} from "./background/BackgroundColorInput";
import {
  BackgroundImageInput,
  thumbHash,
} from "./background/BackgroundImageInput";
import {
  BackgroundCustomInput,
  cssBackground,
} from "./background/BackgroundCustomInput";

export const bgType = sessionSignal<
  "color" | "image" | "custom" | "transparent"
>("bg_type", "color");

export const background = signal<string | Array<number>>(backgroundColor.value);
effect(() => {
  switch (bgType.value) {
    case "color":
      background.value = backgroundColor.value;
      break;

    case "image":
      if (thumbHash.value?.length) {
        background.value = thumbHash.value;
      }
      break;

    case "custom":
      background.value = cssBackground.value;
      break;

    case "transparent":
      background.value = undefined;
  }
});

export const BackgroundFieldset: FunctionComponent<{
  id?: string;
  className?: string;
  hidden?: boolean;
}> = (props) => (
  <fieldset {...props}>
    <legend>Background</legend>
    <RadioGroup
      name="bgType"
      signal={bgType}
      options={[
        { label: "Color", value: "color" },
        { label: "Image", value: "image" },
        { label: "Custom", value: "custom" },
      ]}
    />

    <hr />

    <div hidden={bgType.value !== "color"}>
      <BackgroundColorInput />
    </div>
    <div hidden={bgType.value !== "image"}>
      <BackgroundImageInput />
    </div>
    <div hidden={bgType.value !== "custom"}>
      <BackgroundCustomInput />
    </div>
  </fieldset>
);
