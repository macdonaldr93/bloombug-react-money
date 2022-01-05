import React from 'react';
import * as ReactDOM from 'react-dom';
import { Mint, CAD } from '@bloombug/money';
import currencies from '@bloombug/money/iso-currencies.json';

import { useMoney } from './useMoney';
import { MintProvider } from '../context';

describe('useMoney()', () => {
  let div: HTMLDivElement;

  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('returns expected money', () => {
    const mint = new Mint({ currencies, defaultCurrency: CAD });
    let rendered: any;

    const TestComponent = () => {
      const { Money } = useMoney();
      rendered = Money;

      return <div />;
    };

    ReactDOM.render(
      <MintProvider mint={mint}>
        <TestComponent />
      </MintProvider>,
      div
    );

    expect(rendered!(100)).toEqualMoney(mint.Money(100));
  });

  it('returns expected format', () => {
    const mint = new Mint({ currencies, defaultCurrency: CAD });
    let rendered: any;

    const TestComponent = () => {
      const { formatMoney } = useMoney();
      rendered = formatMoney('fr-FR', 100);

      return <div />;
    };

    ReactDOM.render(
      <MintProvider mint={mint}>
        <TestComponent />
      </MintProvider>,
      div
    );

    expect(rendered).toEqual('1,00 $CA');
  });
});
