import React from 'react';
import * as ReactDOM from 'react-dom';
import { Mint, CAD } from '@bloombug/money';
import currencies from '@bloombug/money/iso-currencies.json';

import { useCurrency } from './useCurrency';
import { MintProvider } from '../context';

describe('useCurrency()', () => {
  let div: HTMLDivElement;

  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('returns expected money ', () => {
    const mint = new Mint({ currencies, defaultCurrency: CAD });
    let rendered: any;

    const TestComponent = () => {
      const { Currency } = useCurrency();
      rendered = Currency;

      return <div />;
    };

    ReactDOM.render(
      <MintProvider mint={mint}>
        <TestComponent />
      </MintProvider>,
      div
    );

    expect(rendered!(CAD)).toEqualCurrency(mint.Currency(CAD));
  });
});
