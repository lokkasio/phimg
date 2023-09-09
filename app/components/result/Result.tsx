import { FunctionComponent } from "preact";
import { clsx } from "clsx";
import { PlaceholderDataUrl, placeholderDataUrl } from "./PlaceholderDataUrl";
import { PlaceholderServiceWorkerUrl } from "./PlaceholderSwUrl";
import style from "./Result.module.css";
import { TargetedEvent } from "preact/compat";

const iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
const onImageLoaded = iOS
  ? (event: TargetedEvent<HTMLImageElement, Event>) => {
      // force repaint on ios
      event.currentTarget.setAttribute("hidden", "");
      requestAnimationFrame(() => {
        event.currentTarget.removeAttribute("hidden");
      });
    }
  : undefined;

export const Result: FunctionComponent<{ className?: string }> = ({
  className,
}) => (
  <main className={clsx(style._, className)}>
    <img src={placeholderDataUrl} onLoad={onImageLoaded} />
    <div className={style.urls}>
      <PlaceholderDataUrl />
      <PlaceholderServiceWorkerUrl />
    </div>
  </main>
);
