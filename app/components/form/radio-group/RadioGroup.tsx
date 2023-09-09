import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import style from "./RadioGroup.module.css";

export type RadioGroupProps<Values = string> = {
  name: string;
  options: {
    label: string;
    value: Values;
  }[];
  signal: Signal<Values>;
};

export const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  name,
  options,
  signal,
}) => (
  <div className={style.radio_group}>
    {options.map(({ label, value }) => (
      <label className={style.radio} key={value}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={signal.value === value}
          onChange={() => {
            signal.value = value;
          }}
        />
        <span>{label}</span>
      </label>
    ))}
  </div>
);
