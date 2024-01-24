import React, { CSSProperties, FC, useMemo } from 'react';
import {
  CurrencyFormatOptions,
  Amount,
  Money,
  isMoney,
  Currency,
} from '@bloombug/money';

import { useMoney } from '../../hooks';

export interface MoneyTextProps extends Omit<CurrencyFormatOptions, 'style'> {
  className?: string;
  currency?: Currency | string | null;
  amount?: Money | Amount;
  locales?: string | string[];
  style?: CSSProperties;
}

export const MoneyText: FC<MoneyTextProps> = ({
  locales,
  amount,
  currency,
  className,
  style,
  ...formatOptions
}) => {
  const { Money } = useMoney();

  const formattedMoney = useMemo(() => {
    if (isMoney(amount)) {
      if (locales) {
        return amount.format(locales, formatOptions);
      }

      return amount.format(formatOptions);
    } else {
      const amountMoney = Money(amount, currency);

      if (locales) {
        return amountMoney.format(locales, formatOptions);
      }

      return amountMoney.format(formatOptions);
    }
  }, [Money, amount, currency, locales, formatOptions]);

  return (
    <span className={className} style={style}>
      {formattedMoney}
    </span>
  );
};
