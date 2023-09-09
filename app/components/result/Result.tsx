import { FunctionComponent } from "preact";
import { TargetedEvent } from "preact/compat";
import { clsx } from "clsx";
import { updateFavicon } from "src/favicon";
import { PlaceholderDataUrl, placeholderDataUrl } from "./PlaceholderDataUrl";
import { PlaceholderServiceWorkerUrl } from "./PlaceholderSwUrl";
import style from "./Result.module.css";

const iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
const onImageLoaded = (event: TargetedEvent<HTMLImageElement, Event>) => {
  updateFavicon(event.currentTarget);

  if (iOS) {
    // force repaint
    event.currentTarget.setAttribute("hidden", "");
    requestAnimationFrame(() => {
      event.currentTarget.removeAttribute("hidden");
    });
  }
};

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
