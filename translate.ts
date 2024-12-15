import { createTranslations } from ".";

export type Locale = "fr" | "en" | "es"

const initialLocale: Locale = "fr";

export const { LocaleProvider, useLocale, useTranslations } = createTranslations<Locale>(initialLocale);