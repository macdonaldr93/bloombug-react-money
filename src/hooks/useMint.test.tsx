import React from 'react';
import * as ReactDOM from 'react-dom';
import { Mint, CAD, currencies } from '@bloombug/money';

import { useMint } from './useMint';
import { MintProvider } from '../context';

describe('useMint()', () => {
  let div: HTMLDivElement;

  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('returns expected mint ', () => {
    const mint = new Mint({ currencies, defaultCurrency: CAD });
    let renderedMint: Mint;

    const TestComponent = () => {
      const { mint } = useMint();
      renderedMint = mint;

      return <div />;
    };

    ReactDOM.render(
      <MintProvider mint={mint}>
        <TestComponent />
      </MintProvider>,
      div
    );

    expect(renderedMint!.defaultCurrency).toEqualCurrency(CAD);
  });
});
