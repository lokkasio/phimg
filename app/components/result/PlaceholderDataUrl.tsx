import { computed } from "@preact/signals";
import { createSvgString, svgStringToDataUrl } from "src/svg";
import { thumbHashToDataURL, alphaHex } from "src/lib";
import { background } from "../form/BackgroundFieldset";
import { thumbHash } from "../form/background/BackgroundImageInput";
import { width, height } from "../form/SizeFieldset";
import { text, textColor, textOpacity } from "../form/TextFieldset";
import { createCopyCode } from "../copy-code/createCopyCode";

const svgString = computed(() => {
  return createSvgString({
    w: width.value,
    h: height.value,
    b: Array.isArray(background.value)
      ? thumbHashToDataURL(thumbHash.value, "image/webp", 0.95)
      : background.value,
    t: text.value,
    c:
      textColor.value && textColor.value.slice(1) + alphaHex(textOpacity.value),
  });
});

export const placeholderDataUrl = computed(() => {
  if (svgString.value) {
    return svgStringToDataUrl(svgString.value);
  }
});

export const PlaceholderDataUrl = createCopyCode(
  "Data URI",
  placeholderDataUrl
);
