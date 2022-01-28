import React, { CSSProperties, FC, useMemo } from 'react';
import { CurrencyCode, CurrencyFormatOptions } from '@bloombug/money';

import { useMoney } from '../../hooks';

export interface MoneyTextProps extends CurrencyFormatOptions {
  className?: string;
  currency?: CurrencyCode | null;
  fractional?: bigint | number | string;
  locales?: string | string[];
  style?: CSSProperties;
}

export const MoneyText: FC<MoneyTextProps> = ({
  locales,
  fractional,
  currency,
  className,
  style,
  ...formatOptions
}) => {
  const { Money } = useMoney();

  const formattedMoney = useMemo(() => {
    if (locales) {
      return Money(fractional, currency).format(locales, formatOptions);
    }

    return Money(fractional, currency).format(formatOptions);
  }, [Money, fractional, currency, locales, formatOptions]);

  return (
    <span className={className} style={style}>
      {formattedMoney}
    </span>
  );
};
