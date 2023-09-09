import { createSvgString, svgStringToDataUrl } from "./svg";

const favicon = document.querySelector("link[rel=icon]");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const size = 32;

export const updateFavicon = (img: HTMLImageElement) => {
  const { naturalWidth, naturalHeight } = img;
  canvas.width = naturalWidth;
  canvas.height = naturalHeight;
  ctx.clearRect(0, 0, naturalWidth, naturalHeight);
  ctx.drawImage(img, 0, 0, naturalWidth, naturalHeight);
  const placeholderDataUrl = canvas.toDataURL();
  const svgString = createSvgString({
    w: size,
    h: size,
    b: `center/contain no-repeat url(${placeholderDataUrl})`,
  });
  favicon.setAttribute("href", svgStringToDataUrl(svgString));
};
