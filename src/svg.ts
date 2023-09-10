import { getFontSize, thumbHashToDataURL } from "./lib.js";
import h from "./vsvg.js";

export type SvgOptions = {
  /** Width */
  w: number;
  /** Height */
  h: number;
  /** Background */
  b?: string;
  /** Text */
  t?: string;
  /** Text Color */
  c?: string;
};

const reAlphaHex = /^[0-9a-f]{6}|[0-9a-f]{8}$/;
const reUrlHexPairs = /%[\dA-F]{2}/g;
const reThumbhash = /^(\d+-)+\d+$/;

export function createSvgString({
  w: width,
  h: height,
  b: background,
  t: text,
  c: textColor,
}: SvgOptions) {
  const fontSize = text ? getFontSize(width * 0.85, text) : 0;
  const backgroundStyle = background
    ? reThumbhash.test(background)
      ? `url(${thumbHashToDataURL(
          background.split("-").map(Number)
        )}) 0/100% 100% no-repeat`
      : reAlphaHex.test(background)
      ? "#" + background
      : background
    : undefined;

  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width,
      height,
      style: backgroundStyle && `background:${backgroundStyle}`,
    },
    text &&
      h(
        "text",
        {
          x: "50%",
          y: "50%",
          "font-size": fontSize,
          "font-family": "system-ui,sans-serif",
          "text-anchor": "middle",
          "dominant-baseline": "middle",
          fill: "#" + textColor,
        },
        text
      )
  );
}

// Adopted from: https://github.com/tigt/mini-svg-data-uri/issues/24#issue-1489943680
const hexDecode = {
  "%20": " ",
  "%3D": "=",
  "%3A": ":",
  "%2F": "/",
  "%3C": "<",
  "%3E": ">",
  "%25": "%",
};
export const svgStringToDataUrl = (svgString: string) => {
  svgString = svgString.trim().replaceAll('"', "'");
  svgString = encodeURIComponent(svgString);
  svgString = svgString.replace(
    reUrlHexPairs,
    (match) => hexDecode[match] || match.toLowerCase()
  );
  return "data:image/svg+xml," + svgString;
};
