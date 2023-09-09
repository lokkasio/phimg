import { FunctionComponent } from "preact";
import { TargetedEvent } from "preact/compat";
import { clsx } from "clsx";
import { updateFavicon } from "src/favicon";
import { PlaceholderDataUrl, placeholderDataUrl } from "./PlaceholderDataUrl";
import { PlaceholderServiceWorkerUrl } from "./PlaceholderSwUrl";
import style from "./Result.module.css";

const iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
const onImageLoaded = (event: TargetedEvent<HTMLImageElement, Event>) => {
  const img = event.target as HTMLImageElement;
  updateFavicon(img);

  if (iOS) {
    // force repaint
    img.setAttribute("hidden", "");
    requestAnimationFrame(() => {
      img.removeAttribute("hidden");
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
