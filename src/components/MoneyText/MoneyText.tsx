import React, { CSSProperties, FC, useMemo } from 'react';
import {
  CurrencyCode,
  CurrencyFormatOptions,
  FractionalInputType,
  Money,
  isMoney,
} from '@bloombug/money';

import { useMoney } from '../../hooks';

export interface MoneyTextProps extends CurrencyFormatOptions {
  className?: string;
  currency?: CurrencyCode | null;
  fractional?: Money | FractionalInputType;
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
    if (isMoney(fractional)) {
      if (locales) {
        return fractional.format(locales, formatOptions);
      }

      return fractional.format(formatOptions);
    } else {
      const fractionalMoney = Money(fractional, currency);

      if (locales) {
        return fractionalMoney.format(locales, formatOptions);
      }

      return fractionalMoney.format(formatOptions);
    }
  }, [Money, fractional, currency, locales, formatOptions]);

  return (
    <span className={className} style={style}>
      {formattedMoney}
    </span>
  );
};
