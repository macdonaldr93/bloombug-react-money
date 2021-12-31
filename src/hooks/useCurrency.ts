import { useMint } from './useMint';

export const useCurrency = () => {
  const { mint } = useMint();
  return { Currency: mint.Currency };
};
