import { useContext } from 'react';

import { MintContext } from '../context/MintContext';

export const useMint = () => useContext(MintContext);

export const useMoney = () => {
  const { mint } = useMint();
  return { Money: mint.Money };
};

export const useCurrency = () => {
  const { mint } = useMint();
  return { Currency: mint.Currency };
};

export const useExchange = () => {
  const { mint } = useMint();
  return { exchange: mint.exchange };
};
