# @aminnairi/react-translate

Type-safe translation for React

## Requirements

- [Node](https://nodejs.org)
- [NPM](https://npmjs.com)

## Installation

```bash
npm install @aminnairi/react-translate
```

## Usage

```typescript
// translate.ts
import { createTranslations } from "@aminnairi/react-translate";

export type Locale = "fr" | "en" | "es";

export const initialLocale: Locale = "fr";

export const {
  LocaleProvider,
  useLocale,
  useTranslations
} = createTranslations(initialLocale);
```

```tsx
// app.tsx
import { useCallback } from "react";
import { useLocale, useTranslations } from "./translate";

export function App() {
  const { locale, setLocale } = useLocale();

  const { translate } = useTranslations({
    title: {
      fr: "Bonjour",
      en: "Hello",
      es: "Hola"
    }
  });

  const switchToEnglish = useCallback(() => {
    setLocale("en");
  }, []);

  const switchToFrench = useCallback(() => {
    setLocale("fr");
  }, []);

  const switchToSpanish = useCallback(() => {
    setLocale("fr");
  }, []);

  return (
    <div>
      <button>Switch to english</button>
      <button>Switch to french</button>
      <button>Switch to spanish</button>
      <h1>{translate("title", locale)}</h1>
    </div>
  );
}
```

```tsx
// main.tsx
import { createRoot } from "react-dom/client";
import { LocaleProvider } from "./translate";
import { App } from "./app";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(
  <LocaleProvider>
    <App />
  </LocaleProvider>
);
```