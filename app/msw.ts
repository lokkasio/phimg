import { rest, setupWorker } from "msw";
import { phimgResolver } from "src/msw";

const pathPrefix = process.env.CI ? "/phimg" : "";

export const initMsw = () =>
  setupWorker(rest.get("/phimg.svg", phimgResolver)).start({
    serviceWorker: {
      url: pathPrefix + "/mockServiceWorker.js",
      options: {
        scope: pathPrefix + "/",
      },
    },
  });
