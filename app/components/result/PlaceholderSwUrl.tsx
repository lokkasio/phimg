import { computed } from "@preact/signals";
import { createCopyCode } from "../copy-code/createCopyCode";
import { placeholderSearchParams } from "./placeholderSearchParms";

const placeholderUrl = computed(
  () => `/phimg.svg?${placeholderSearchParams.value}`
);

export const PlaceholderServiceWorkerUrl = createCopyCode(
  <>
    <code>src</code> for MSW
  </>,
  placeholderUrl
);
