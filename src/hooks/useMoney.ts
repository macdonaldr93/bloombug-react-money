import { useCallback } from 'react';
import { CurrencyFormatOptions, Amount, Currency } from '@bloombug/money';

import { useMint } from './useMint';

export type FormatMoney = {
  (amount?: Amount | undefined): string;
  (amount?: Amount | undefined, options?: CurrencyFormatOptions): string;
  (
    amount?: Amount | undefined,
    currency?: Currency | string | null | undefined,
    options?: CurrencyFormatOptions
  ): string;
  (
    amount?: Amount | undefined,
    currency?: Currency | string | null | undefined,
    locales?: string | string[],
    options?: CurrencyFormatOptions
  ): string;
};

export const useMoney = () => {
  const { mint } = useMint();
  const { Money } = mint;

  const formatMoney: FormatMoney = useCallback(
    (
      amount?: Amount | undefined,
      currency:
        | string
        | Currency
        | null
        | undefined
        | CurrencyFormatOptions = mint.defaultCurrency,
      locales: string | string[] | CurrencyFormatOptions = mint.defaultLocale,
      options: CurrencyFormatOptions = {}
    ) => {
      if (typeof currency === 'undefined') {
        return Money(amount).format();
      }

      if (isCurrencyOptions(currency)) {
        return Money(amount).format(mint.defaultLocale, currency);
      }

      if (isLocalesOptions(locales)) {
        return Money(amount, currency).format(mint.defaultLocale, locales);
      }

      return Money(amount, currency).format(locales, options);
    },
    [Money]
  );

  return { Money, formatMoney };
};

export function isCurrencyOptions(
  currency: string | null | Currency | CurrencyFormatOptions
): currency is CurrencyFormatOptions {
  return (
    typeof currency !== 'string' &&
    currency !== null &&
    !('isoCode' in currency)
  );
}

export function isLocalesOptions(
  locales: string | string[] | undefined | CurrencyFormatOptions
): locales is CurrencyFormatOptions {
  return typeof locales !== 'string' && !Array.isArray(locales);
}
