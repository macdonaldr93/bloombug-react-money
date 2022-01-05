import { useContext } from 'react';

import { MintContext } from '../context';

export const useMint = () => useContext(MintContext);
