# @aminnairi/react-translate

[![npm version](https://badgen.net/npm/v/@aminnairi/react-translate)](https://www.npmjs.com/package/@aminnairi/react-translate)
[![types](https://badgen.net/npm/types/@aminnairi/react-translate)](https://www.npmjs.com/package/@aminnairi/react-translate)
[![license](https://badgen.net/npm/license/@aminnairi/react-translate)](LICENSE)

Type-safe translation for React

## Features

- **🛡️ 100% Type-Safe**: Say goodbye to missing translations. TypeScript ensures every locale is defined for every translation at compile time.
- **🏭 Tailored to Your App**: The `createTranslations` factory creates a bespoke Provider and Hooks specifically typed to your app's supported locales, preventing global state pollution.
- **💬 Dynamic Interpolation**: Easily pass variables to your translations using plain TypeScript functions—no custom parsing or complex string interpolation syntax required.
- **⚛️ React-Native Integration**: Built on top of React Context and Hooks for a seamless, idiomatic integration with your React applications.
- **🪶 Zero Dependencies**: Lightweight and built directly on top of React's built-in APIs.

## Requirements

- [Node](https://nodejs.org)
- [NPM](https://npmjs.com)

## Installation

```bash
npm install @aminnairi/react-translate
```

## Usage

### 1. Initialize Translations

Create a `translate.ts` file to set up your locales and generate the components and hooks you will need for your application. We use `createTranslations` to configure the library and extract the functions we need.

```typescript
// translate.ts
import { createTranslations } from "@aminnairi/react-translate";

export const {
  LocaleProvider,
  useTranslate,
  useLocale,
  defineTranslation
} = createTranslations({
  initialLocale: "en",
  locales: [
    "en",
    "fr"
  ]
});
```

### 2. Define Translations

Use `defineTranslation` to define type-safe translations safely outside of your components. This avoids re-creation on every render and ensures strong typing. **If you add a new locale to your configuration later, TypeScript will immediately flag every `defineTranslation` call as an error until you provide the missing translation.**

```typescript
// translations.ts
import { defineTranslation } from "./translate";

export const title = defineTranslation((emails: number) => ({
  en: `Hello! You have ${emails} unread emails.`,
  fr: `Bonjour ! Vous avez ${emails} emails non-lus.`
}));
```

### 3. Provide the Context

Wrap your application in the `LocaleProvider` so that your components can access the current locale.

```tsx
// main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { LocaleProvider } from "./translate";
import { App } from "./app";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found.");
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>
);
```

### 4. Use in your Components

Use the `useTranslate` hook to get the actual translated string according to your component's current locale. Use `useLocale` to read or change the current language.

```tsx
// app.tsx
import React, { useCallback } from "react";
import { useTranslate, useLocale } from "./translate";
import { title } from "./translations";

export function App() {
  const { locale, setLocale } = useLocale();

  const onEnglishSwitchButtonClick = useCallback(() => {
    setLocale("en");
  }, [setLocale]);

  const onFrenchSwitchButtonClick = useCallback(() => {
    setLocale("fr");
  }, [setLocale]);

  // Pass your defined translation function to the useTranslate hook
  const translateTitle = useTranslate(title);

  return (
    <div>
      <p>Current Locale: {locale}</p>
      
      <button onClick={onEnglishSwitchButtonClick}>
        Switch to English
      </button>
      <button onClick={onFrenchSwitchButtonClick}>
        Passer en français
      </button>
      
      {/* Call the resulting function with your arguments */}
      <h1>{translateTitle(456)}</h1>
    </div>
  );
}
```

## Example

You can find a complete, working example in the [apps/example](apps/example) directory.

## API

### `createTranslations(options)`

Initializes the translations for your app and returns the provider, hooks, and helpers tailored to your specific locales.

- **Arguments**: 
  - `options.initialLocale`: The locale to use by default on initialization.
  - `options.locales`: An array of all possible locales in your application.
- **Returns**:
  - `LocaleProvider`: A React component to wrap your application.
  - `useLocale`: A hook to get and update the current locale.
  - `defineTranslation`: A helper to define a typed translation function.
  - `useTranslate`: A hook to apply a defined translation and get a function that returns the translated text for the current locale.

### `LocaleProvider`

A React Context Provider component to be placed at the root of your React tree. It stores the current locale state.

- **Props**:
  - `children`: The React components to render.

### `useLocale()`

A React Hook that returns the current locale state and a setter function.

- **Returns**:
  - `locale`: The currently active locale (e.g., `"en"` or `"fr"`).
  - `setLocale`: A state setter function to update the current locale.

### `defineTranslation(translate)`

A helper function that returns the same function you pass to it, but enforces type-safety ensuring that all configured locales are present in the returned object. This is particularly useful for maintenance: adding a new locale to your app will trigger a compilation error for every translation that hasn't been updated yet.

- **Arguments**:
  - `translate`: A function that receives your dynamic inputs and returns an object containing keys for every locale, with the translated strings as values.

### `useTranslate(translate)`

A React Hook that connects your defined translation function to the current locale.

- **Arguments**:
  - `translate`: A translation function created by `defineTranslation`.
- **Returns**: A function that accepts the same arguments as your `translate` function but directly returns the final translated string for the currently active locale.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read our [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Please report any security vulnerabilities following our [Security Policy](SECURITY.md).

## Changelog

See the [Changelog](CHANGELOG.md) for a list of changes.

## License

[MIT](LICENSE)
