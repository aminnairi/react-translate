import { createRoot } from "react-dom/client";
import { LocaleProvider } from "./translate";
import { App } from "./app";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found.");
}

createRoot(rootElement).render(
  <LocaleProvider>
    <App />
  </LocaleProvider>
);