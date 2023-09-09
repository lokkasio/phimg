import { FunctionComponent, ComponentChild } from "preact";
import style from "./Input.module.css";

export const Input: FunctionComponent<{ label: ComponentChild }> = ({
  label,
  children,
}) => (
  <label className={style.input}>
    <span>{label}</span>
    {children}
  </label>
);
