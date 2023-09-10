import { FunctionComponent } from "preact";
import { clsx } from "clsx";
import { sessionSignal } from "app/sessionSignal";
import { RadioGroup } from "../form/radio-group/RadioGroup";
import { PlaceholderDataUrl } from "./PlaceholderDataUrl";
import { PlaceholderServiceWorkerUrl } from "./PlaceholderSwUrl";
import style from "./Result.module.css";

const previewMode = sessionSignal("preview_mode", "dataurl");
const swAvailable = "serviceWorker" in navigator;

export const Result: FunctionComponent<{ className?: string }> = ({
  className,
}) => (
  <main className={clsx(style._, className)}>
    {swAvailable && (
      <RadioGroup
        name="mode"
        options={[
          {
            label: "Data URL",
            value: "dataurl",
          },
          {
            label: "MSW",
            value: "msw",
          },
        ]}
        signal={previewMode}
      />
    )}

    <PlaceholderDataUrl
      hidden={previewMode.value !== "dataurl"}
      className={style.mode}
    />

    <PlaceholderServiceWorkerUrl
      hidden={previewMode.value !== "msw"}
      className={style.mode}
    />
  </main>
);
