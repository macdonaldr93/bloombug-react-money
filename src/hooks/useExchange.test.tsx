import React from 'react';
import * as ReactDOM from 'react-dom';
import { Exchange, Mint, CAD } from '@bloombug/money';
import currencies from '@bloombug/money/iso-currencies.json';

import { useExchange } from './useExchange';
import { MintProvider } from '../context';

describe('useExchange()', () => {
  let div: HTMLDivElement;

  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('returns expected money ', () => {
    const exchange = new Exchange();
    const mint = new Mint({ currencies, defaultCurrency: CAD, exchange });
    let rendered: any;

    const TestComponent = () => {
      const { exchange } = useExchange();
      rendered = exchange;

      return <div />;
    };

    ReactDOM.render(
      <MintProvider mint={mint}>
        <TestComponent />
      </MintProvider>,
      div
    );

    expect(rendered!).toEqual(exchange);
  });
});
