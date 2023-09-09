import "./index.css";

import { render } from "preact";
import { App } from "./components/App";

render(<App />, document.getElementById("app"));

if (process.env.NODE_ENV !== "production") {
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload()
  );
}
