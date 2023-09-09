import { computed } from "@preact/signals";
import { alphaHex } from "src/lib";
import { background } from "../form/BackgroundFieldset";
import { width, height } from "../form/SizeFieldset";
import { textType, text, textColor, textOpacity } from "../form/TextFieldset";

export const placeholderSearchParams = computed(() => {
  const searchParams = new URLSearchParams({
    w: String(width.value),
    h: String(height.value),
  });

  if (textType.value !== "none" && text.value.length) {
    searchParams.set("t", text.value);
    searchParams.set(
      "c",
      textColor.value.slice(1) + alphaHex(textOpacity.value)
    );
  }

  if (background.value) {
    searchParams.set(
      "b",
      Array.isArray(background.value)
        ? Array.from(background.value).join("-")
        : background.value
    );
  }

  return searchParams;
});
