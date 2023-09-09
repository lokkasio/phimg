import { ComponentChild, createRef } from "preact";
import { Signal, effect, signal } from "@preact/signals";
import style from "./CopyCode.module.css";

const copiedRef = signal<HTMLInputElement>(null);

export const createCopyCode = (label: ComponentChild, s: Signal<string>) => {
  let timer: number;
  const inputRef = createRef<HTMLInputElement>();
  const copyText = signal("Copy");
  const copy = () => {
    inputRef.current.select();
    document.execCommand("copy");

    copiedRef.value = inputRef.current;
    copyText.value = "Copied";
    timer = window.setTimeout(() => {
      copyText.value = "Copy";
    }, 1500);
  };

  effect(() => {
    if (copiedRef.value !== inputRef.current) {
      copyText.value = "Copy";
      window.clearTimeout(timer);
    }
  });

  return () => (
    <label className={style.label}>
      <span>{label}</span>
      <div className={style._}>
        <input
          className={style.code}
          type="text"
          readOnly
          value={s}
          ref={inputRef}
        />
        <button className={style.copy} onClick={copy}>
          {copyText}
        </button>
      </div>
    </label>
  );
};
