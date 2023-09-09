import "./index.css";
import { rest, setupWorker } from "msw";
import { mswResolver } from "src/msw";

const $input = document.getElementById("input") as HTMLInputElement;
const $img = document.getElementById("img") as HTMLImageElement;
const $content = document.getElementById("content") as HTMLDivElement;
const $log = document.getElementById("log") as HTMLPreElement;

const f = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
});
const log = (msg: string) => {
  $log.textContent += f.format(new Date()) + " " + msg + "\n";
};

$img.addEventListener("load", () => {
  $content.setAttribute("aria-busy", "false");
});
$img.addEventListener("error", (e) => {
  $content.setAttribute("aria-busy", "false");
  log("failed to fetch image (try to reload the page)");
});

const updateSrc = () => {
  const hash = location.hash;
  if (hash) {
    $content.setAttribute("aria-busy", "true");
    const src = "/phimg.svg?" + hash.slice(2);
    $input.value = src;
    $img.src = src;
  }
};

$input.addEventListener("input", (event) => {
  const url = new URL(
    (event.target as HTMLInputElement).value,
    location.origin
  );
  location.hash = `#!${url.searchParams}`;
});

if (!("serviceWorker" in navigator)) {
  log("❌ service worker is not supported by your browser!");
  $content.setAttribute("aria-busy", "false");
}

setupWorker(rest.get("/phimg.svg", mswResolver))
  .start()
  .then(updateSrc)
  .catch(log);
window.addEventListener("hashchange", updateSrc);

if (process.env.NODE_ENV !== "production") {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload()
  );
}
