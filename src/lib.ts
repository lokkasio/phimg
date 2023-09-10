import { rgbaToThumbHash, thumbHashToRGBA } from "thumbhash";
import { SvgOptions, createSvgString } from "./svg.js";

const toHex = (c: number) => ("0" + c.toString(16)).slice(-2);
export const alphaHex = (a: number) =>
  a < 100 ? toHex(Math.round(a * 2.55)) : "";

const create2dContex = (width: number, height: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas.getContext("2d");
};

export const thumbHashFromImage = (imageElement: HTMLImageElement) => {
  const { naturalWidth, naturalHeight } = imageElement;

  const scale = 100 / Math.max(naturalWidth, naturalHeight);
  const canvasWidth = Math.round(naturalWidth * scale);
  const canvasHeight = Math.round(naturalHeight * scale);
  const context = create2dContex(canvasWidth, canvasHeight);
  context.drawImage(imageElement, 0, 0, canvasWidth, canvasHeight);
  const pixels = context.getImageData(0, 0, canvasWidth, canvasHeight);
  const thumbHash = rgbaToThumbHash(pixels.width, pixels.height, pixels.data);

  return Array.from(thumbHash);
};

export const getFontSize = (boxWidth: number, text: string) => {
  const context = create2dContex(0, 0);
  const referenceFontSize = 20;
  context.font = `${referenceFontSize}px system-ui,sans-serif`;
  const metrics = context.measureText(text);
  const textWidth =
    metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
  return Math.floor((boxWidth / textWidth) * referenceFontSize);
};

export const thumbHashToDataURL = (
  thumbHash: Array<number>,
  type = "image/webp",
  quality = 0.95
) => {
  const { w, h, rgba } = thumbHashToRGBA(thumbHash);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const context = canvas.getContext("2d");
  const rgbaClamped = new Uint8ClampedArray(rgba);
  const imageData = new ImageData(rgbaClamped, w, h);
  context.putImageData(imageData, 0, 0);
  return canvas.toDataURL(type, quality);
};

export const searchParamsToSvgString = (searchParams: URLSearchParams) => {
  const svgOptions = Object.fromEntries(
    searchParams.entries()
  ) as unknown as SvgOptions;
  if (svgOptions) {
    return createSvgString(svgOptions);
  }
};
