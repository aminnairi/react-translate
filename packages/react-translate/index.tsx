import { createContext, type Dispatch, type ReactNode, type SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Translations<Locale extends string> = {
  [key in Locale]: string
}

export type TranslationFunction<Input, Locale extends string> = (input: Input) => Translations<Locale>

export interface StorageAdapter<Locale extends string> {
  get: () => string | null;
  set: (locale: Locale) => void;
}

export interface InitializeTranslationsOptions<Locale extends string> {
  locales: Locale[],
  initialLocale: Locale,
  storage?: StorageAdapter<Locale>
}

export interface TranslationContextInterface<Locale extends string> {
  locale: Locale
  setLocale: Dispatch<SetStateAction<Locale>>
}

export interface LocaleProviderProps<Locale extends string> {
  children: ReactNode;
  initialLocale?: Locale;
}

export const createLocalStorageAdapter = (key: string): StorageAdapter<string> => {
  return {
    get: () => {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          return window.localStorage.getItem(key);
        }
      } catch {
        // Ignore errors (e.g. security restrictions or missing localStorage)
      }

      return null;
    },
    set: (locale: string) => {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(key, locale);
        }
      } catch {
        // Ignore errors (e.g. quota exceeded)
      }
    }
  };
};

export const createTranslations = <Locale extends string>({ initialLocale: factoryInitialLocale, locales, storage }: InitializeTranslationsOptions<Locale>) => {
  const TranslationContext = createContext<TranslationContextInterface<Locale> | null>(null);

  const LocaleProvider = ({ children, initialLocale: propInitialLocale }: LocaleProviderProps<Locale>) => {
    const [locale, setLocale] = useState<Locale>(() => {
      if (storage) {
        const savedLocale = storage.get();
        if (savedLocale && locales.includes(savedLocale as Locale)) {
          return savedLocale as Locale;
        }
      }
      return propInitialLocale ?? factoryInitialLocale;
    });

    useEffect(() => {
      if (storage) {
        storage.set(locale);
      }
    }, [locale]);

    const value = useMemo(() => {
      return {
        locale,
        setLocale,
      };
    }, [locale]);

    return (
      <TranslationContext.Provider value={value}>
        {children}
      </TranslationContext.Provider>
    );
  }

  function defineTranslation<Input>(translate: TranslationFunction<Input, Locale>): TranslationFunction<Input, Locale>;
  function defineTranslation(translate: Translations<Locale>): Translations<Locale>;
  function defineTranslation<Input>(translate: TranslationFunction<Input, Locale> | Translations<Locale>) {
    return translate;
  }

  const useLocale = (): TranslationContextInterface<Locale> => {
    const context = useContext(TranslationContext);

    if (!context) {
      throw new Error("useLocale must be used within a LocaleProvider.");
    }

    return context;
  }

  function useTranslate<Input>(translate: TranslationFunction<Input, Locale>): (input: Input) => string;
  function useTranslate(translate: Translations<Locale>): () => string;
  function useTranslate<Input>(translate: TranslationFunction<Input, Locale> | Translations<Locale>) {
    const { locale } = useLocale();

    return useCallback((input: Input) => {
      if (typeof translate === "function") {
        return translate(input)[locale as keyof Translations<Locale>];
      }

      return translate[locale as keyof Translations<Locale>];
    }, [locale, translate]);
  }

  return {
    defineTranslation,
    LocaleProvider,
    useTranslate,
    useLocale,
  }
}
