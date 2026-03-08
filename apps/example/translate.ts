import { createTranslations, createLocalStorageAdapter } from "@aminnairi/react-translate";

export const { LocaleProvider, useTranslate, useLocale, defineTranslation } = createTranslations({
  initialLocale: "en",
  locales: [
    "en",
    "fr"
  ],
  storage: createLocalStorageAdapter("locale"),
});
