import { useCallback } from 'react';
import { CurrencyFormatOptions } from '@bloombug/money';

import { useMint } from './useMint';

export type FormatMoney = {
  (fractional?: string | number | bigint | undefined): string;
  (
    fractional?: string | number | bigint | undefined,
    options?: CurrencyFormatOptions
  ): string;
  (
    fractional?: string | number | bigint | undefined,
    currency?: string | null | undefined,
    options?: CurrencyFormatOptions
  ): string;
  (
    fractional?: string | number | bigint | undefined,
    currency?: string | null | undefined,
    locales?: string | string[],
    options?: CurrencyFormatOptions
  ): string;
};

export const useMoney = () => {
  const { mint } = useMint();
  const { Money } = mint;

  const formatMoney: FormatMoney = useCallback(
    (
      fractional?: string | number | bigint | undefined,
      currency: string | null | undefined | CurrencyFormatOptions = mint
        .defaultCurrency.isoCode,
      locales: string | string[] | CurrencyFormatOptions = mint.defaultLocale,
      options: CurrencyFormatOptions = {}
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
  currency: string | null | CurrencyFormatOptions
): currency is CurrencyFormatOptions {
  return typeof currency !== 'string' && currency !== null;
}

export function isLocalesOptions(
  locales: string | string[] | undefined | CurrencyFormatOptions
): locales is CurrencyFormatOptions {
  return typeof locales !== 'string' && !Array.isArray(locales);
}
