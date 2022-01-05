import React, { CSSProperties, FC, useMemo } from 'react';
import { CurrencyCode } from '@bloombug/money';

import { useMoney } from '../../hooks';

export interface MoneyTextProps
  extends Omit<Partial<Intl.NumberFormatOptions>, 'style' | 'currency'> {
  className?: string;
  currency?: CurrencyCode | null;
  fractional?: bigint | number | string;
  locale?: string | string[];
  style?: CSSProperties;
}

export const MoneyText: FC<MoneyTextProps> = ({
  locale,
  fractional,
  currency,
  className,
  style,
  ...formatOptions
}) => {
  const { Money } = useMoney();

  const formattedMoney = useMemo(
    () => Money(fractional, currency).format(locale, formatOptions),
    [Money, fractional, currency, locale, formatOptions]
  );

  return (
    <span className={className} style={style}>
      {formattedMoney}
    </span>
  );
};
