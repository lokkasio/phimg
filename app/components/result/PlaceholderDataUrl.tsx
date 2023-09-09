import { computed } from "@preact/signals";
import { svgStringToDataUrl } from "src/svg";
import { searchParamsToSvgString } from "src/lib";
import { createCopyCode } from "../copy-code/createCopyCode";
import { placeholderSearchParams } from "./placeholderSearchParms";

export const placeholderDataUrl = computed(() => {
  const svgString = searchParamsToSvgString(placeholderSearchParams.value);
  if (svgString) {
    return svgStringToDataUrl(svgString);
  }
});

export const PlaceholderDataUrl = createCopyCode(
  "Data URI",
  placeholderDataUrl
);
