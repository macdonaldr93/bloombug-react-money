import { useCallback } from 'react';

import { useMint } from './useMint';

export type NumberFormatOptions = Omit<
  Intl.NumberFormatOptions,
  'style' | 'currency'
>;

export type FormatMoney = {
  (fractional?: string | number | bigint | undefined): string;
  (
    fractional?: string | number | bigint | undefined,
    options?: NumberFormatOptions
  ): string;
  (
    fractional?: string | number | bigint | undefined,
    currency?: string | null | undefined,
    options?: NumberFormatOptions
  ): string;
  (
    fractional?: string | number | bigint | undefined,
    currency?: string | null | undefined,
    locales?: string | string[],
    options?: NumberFormatOptions
  ): string;
};

export const useMoney = () => {
  const { mint } = useMint();
  const { Money } = mint;

  const formatMoney: FormatMoney = useCallback(
    (
      fractional?: string | number | bigint | undefined,
      currency: string | null | undefined | NumberFormatOptions = mint
        .defaultCurrency.isoCode,
      locales: string | string[] | NumberFormatOptions = mint.defaultLocale,
      options: NumberFormatOptions = {}
    ) => {
      if (typeof currency === 'undefined') {
        return Money(fractional).format();
      }

      if (isCurrencyOptions(currency)) {
        return Money(fractional).format(mint.defaultLocale, currency);
      }

      if (isLocalesOptions(locales)) {
        return Money(fractional, currency).format(mint.defaultLocale, locales);
      }

      return Money(fractional, currency).format(locales, options);
    },
    [Money]
  );

  return { Money, formatMoney };
};

export function isCurrencyOptions(
  currency: string | null | NumberFormatOptions
): currency is NumberFormatOptions {
  return typeof currency !== 'string' && currency !== null;
}

export function isLocalesOptions(
  locales: string | string[] | undefined | NumberFormatOptions
): locales is NumberFormatOptions {
  return typeof locales !== 'string' && !Array.isArray(locales);
}
