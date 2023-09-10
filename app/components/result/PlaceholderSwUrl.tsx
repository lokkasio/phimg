import { JSX } from "preact";
import { useEffect } from "preact/hooks";
import { signal, computed } from "@preact/signals";
import { repaintOnIos } from "app/repaintOnIos";
import { width, height } from "../form/SizeFieldset";
import { createCopyCode } from "../copy-code/createCopyCode";
import { placeholderSearchParams } from "./placeholderSearchParms";
import style from "./Result.module.css";

const placeholderUrl = computed(
  () => `/phimg.svg?${placeholderSearchParams.value}`
);

const SrcInput = createCopyCode("Image source", placeholderUrl);
const mswLoadingState = signal<0 | 1 | 2>(0);

export const PlaceholderServiceWorkerUrl = (
  props: JSX.HTMLAttributes<HTMLDivElement>
) => {
  useEffect(() => {
    if (!props.hidden && mswLoadingState.value === 0) {
      mswLoadingState.value = 1;
      import("../../msw")
        .then((msw) => {
          msw.initMsw().then(() => {
            mswLoadingState.value = 2;
          });
        })
        .catch(() => {
          mswLoadingState.value = 0;
        });
    }
  }, [props.hidden]);

  return (
    <div {...props}>
      <div
        className={style.image}
        style={mswLoadingState.value < 2 && { height: height.value }}
        aria-busy={mswLoadingState.value < 2}
        aria-labelledby="msw-loading"
      >
        <img
          alt="Generated placeholder image"
          width={width}
          height={height}
          src={mswLoadingState.value === 2 && placeholderUrl}
          onLoad={(event) => repaintOnIos(event.target as HTMLImageElement)}
        />
      </div>
      <progress
        id="msw-loading"
        className={style.loader}
        aria-label="Image loading…"
      />
      <SrcInput />

      <details>
        <summary>How to use</summary>
        <div>
          <pre>
            {`\
<img
  src="${placeholderUrl}"
  width="${width}"
  height="${height}"
  alt="Placeholder image"
/>`}
          </pre>
          <hr />
          <pre>
            {`\
import { setupWorker, rest } from 'msw'
import { phimgResolver } from "phimg/msw"

const worker = setupWorker(
  rest.get(rest.get("/phimg.svg", phimgResolver)),
)
worker.start()`}
          </pre>
          <p>
            <a href="https://mswjs.io/">Mock Service Worker</a>
          </p>
        </div>
      </details>
    </div>
  );
};
