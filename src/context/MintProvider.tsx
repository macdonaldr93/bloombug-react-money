import React, { FC, ReactChild } from 'react';
import { Mint } from '@bloombug/money';

import { MintContext } from './MintContext';

export interface Props {
  children: ReactChild;
  mint: Mint;
}

export const MintProvider: FC<Props> = ({ children, mint }) => {
  return (
    <MintContext.Provider value={{ mint }}>{children}</MintContext.Provider>
  );
};
