import React from 'react';
import * as ReactDOM from 'react-dom';
import { Mint, CAD, currencies, InMemoryExchangeStore } from '@bloombug/money';

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
    const store = new InMemoryExchangeStore();
    const mint = new Mint({
      currencies,
      defaultCurrency: CAD,
      exchange: { store },
    });
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

    expect(rendered.store!).toEqual(store);
  });
});
