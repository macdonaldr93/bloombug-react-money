import { useMint } from './useMint';

export const useExchange = () => {
  const { mint } = useMint();
  return { exchange: mint.exchange };
};
