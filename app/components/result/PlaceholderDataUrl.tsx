import { JSX } from "preact";
import { computed } from "@preact/signals";
import { svgStringToDataUrl } from "src/svg";
import { searchParamsToSvgString } from "src/lib";
import { updateFavicon } from "app/favicon";
import { repaintOnIos } from "app/repaintOnIos";
import { width, height } from "../form/SizeFieldset";
import { createCopyCode } from "../copy-code/createCopyCode";
import { placeholderSearchParams } from "./placeholderSearchParms";

const placeholderDataUrl = computed(() => {
  const svgString = searchParamsToSvgString(placeholderSearchParams.value);
  if (svgString) {
    return svgStringToDataUrl(svgString);
  }
});
const SrcInput = createCopyCode("Image source", placeholderDataUrl);

const onImageLoaded = (event: Event) => {
  const img = event.target as HTMLImageElement;
  updateFavicon(img);
  repaintOnIos(img);
};

export const PlaceholderDataUrl = (
  props: JSX.HTMLAttributes<HTMLDivElement>
) => (
  <div {...props}>
    <img
      alt="Generated placeholder image"
      width={width}
      height={height}
      onLoad={onImageLoaded}
      src={placeholderDataUrl}
    />
    <SrcInput />
  </div>
);
