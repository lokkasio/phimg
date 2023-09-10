import { rest, setupWorker } from "msw";
import { mswResolver } from "src/msw";

const pathPrefix = process.env.CI ? "/phimg" : "";

export const initMsw = () =>
  setupWorker(rest.get("/phimg.svg", mswResolver)).start({
    serviceWorker: {
      url: pathPrefix + "/mockServiceWorker.js",
      options: {
        scope: pathPrefix + "/",
      },
    },
  });
