import { FunctionComponent, createRef } from "preact";
import { sessionSignal } from "app/sessionSignal";
import { Input } from "../input/Input";
import style from "../Background.module.css";

export const cssBackground = sessionSignal<string>(
  "bg_css",
  "0/100px 100px linear-gradient(45deg,#eee 25%,#ccc 25%,#ccc 50%,#eee 50%,#eee 75%,#ccc 75%,#ccc 100%)"
);

const customTestDiv = document.createElement("div");
const customInputRef = createRef<HTMLTextAreaElement>();

const onInput = (event: Event) => {
  const textareaElement = event.target as HTMLInputElement;
  customTestDiv.style.background = "";
  customTestDiv.style.background = textareaElement.value;

  requestAnimationFrame(() => {
    if (!textareaElement.value || customTestDiv.style.background) {
      cssBackground.value = textareaElement.value;
      customInputRef.current.setCustomValidity("");
    } else {
      customInputRef.current.setCustomValidity("Invalid field.");
    }
  });
};

export const BackgroundCustomInput: FunctionComponent = () => (
  <Input
    label={
      <>
        CSS <code>background</code> value
      </>
    }
  >
    <textarea
      spellcheck={false}
      ref={customInputRef}
      onInput={onInput}
      className={style.custom}
    >
      {cssBackground}
    </textarea>
  </Input>
);
