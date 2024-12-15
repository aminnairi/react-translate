import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";

/**
 * Initializes the React hooks and provider needed to translate your texts.
 * @example
 * ```typescript
 * import { createTranslations } from "@aminnairi/react-translate"
 *
 * type Locale = "fr" | "en" | "es"
 *
 * const initialLocale: Locale = "fr";
 *
 * export const { LocaleProvider, useLocale, useTranslations } = createTranslations(initialLocale);
 * ```
 */
export function createTranslations<Locale extends string>(initialLocale: Locale) {
  /**
   * Create a set of translation texts.
   * @example
   * ```typescript
   * import { useLocale, useTranslations } from "./translate";
   *
   * export function App() {
   *   const { locale, setLocale } = useLocale();
   *
   *   const switchToEnglish = useCallback(() => {
   *     setLocale("en");
   *   }, []);
   *
   *   const switchToFrench = useCallback(() => {
   *     setLocale("fr");
   *   }, []);
   *
   *   const { translate } = useTranslations({
   *     title: {
   *       fr: "Bonjour",
   *       en: "Hello",
   *       es: "Hola"
   *     }
   *   });
   *
   *   return (
   *     <div>
   *       <button onClick={switchToEnglish}>English</button>
   *       <button onClick={switchToFrench}>French</button>
   *       <h1>{translate("title", locale)}</h1>
   *     </div>
   *   );
   * }
   * ```
   */
  function useTranslations<Translations extends Record<string, Record<Locale, string>>>(translations: Translations) {
    function translate<Key extends keyof Translations>(key: Key, language: Locale) {
      const translation = translations[key];

      if (!translation) {
        return "";
      }

      return translation[language];
    }

    return {
      translate
    }
  }

  const LocaleContext = createContext<{ locale: Locale, setLocale: Dispatch<SetStateAction<Locale>> }>({
    locale: initialLocale,
    setLocale: () => { }
  });

  /**
   *
   * @example
   * ```typescript
   * import { createRoot } from "react-dom/client";
   * import { LocaleProvider } from "./translate";
   * import { App } from "./app";
   *
   * const rootElement = document.getElementById("root");
   *
   * if (!rootElement) {
   *   throw new Error("Root element not found.");
   * }
   *
   * const root = createRoot(rootElement);
   *
   * root.render(
   *   <LocaleProvider>
   *     <App />
   *   </LocaleProvider>
   * );
   * ```
   */
  function LocaleProvider({ children }: { children: ReactNode }): ReactNode {
    const [locale, setLocale] = useState<Locale>(initialLocale);

    const value = useMemo(() => {
      return {
        locale,
        setLocale
      };
    }, [locale]);

    return (
      <LocaleContext.Provider value={value}>
        {children}
      </LocaleContext.Provider>
    );
  }

  /**
   * Get and set the current locale used by the client.
   * @example
   * ```typescript
   * export function App() {
   *   const { locale, setLocale } = useLocale();
   *
   *   const switchToEnglish = useCallback(() => {
   *     setLocale("en");
   *   }, []);
   *
   *   const switchToFrench = useCallback(() => {
   *     setLocale("fr");
   *   }, []);
   *
   *   const { translate } = useTranslations({
   *     title: {
   *       fr: "Bonjour",
   *       en: "Hello",
   *       es: "Hola"
   *     }
   *   });
   *
   *   return (
   *     <div>
   *       <button onClick={switchToEnglish}>English</button>
   *       <button onClick={switchToFrench}>French</button>
   *       <h1>{translate("title", locale)}</h1>
   *     </div>
   *   );
   * }
   * ```
   */
  function useLocale(): { locale: Locale, setLocale: Dispatch<SetStateAction<Locale>> } {
    const { locale, setLocale } = useContext(LocaleContext);

    return {
      locale,
      setLocale
    }
  }

  return {
    useLocale,
    LocaleProvider,
    LocaleContext,
    useTranslations
  }
}