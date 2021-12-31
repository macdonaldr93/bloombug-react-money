import { useCallback } from 'react';
import { useMint } from './useMint';

export const useMoney = () => {
  const { mint } = useMint();
  const { Money } = mint;

  const formatMoney = useCallback(
    (
      locales: string | string[],
      fractional?: string | number | bigint | undefined,
      currency?: string | null | undefined,
      options: Omit<Intl.NumberFormatOptions, 'style' | 'currency'> = {}
    ) => {
      return Money(fractional, currency).format(locales, options);
    },
    [Money]
  );

  return { Money, formatMoney };
};
