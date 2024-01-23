import { createContext } from 'react';
import { Mint } from '@bloombug/money';

export interface IMintContext {
  mint: Mint;
}

export const MintContext = createContext<IMintContext>({ mint: new Mint() });
