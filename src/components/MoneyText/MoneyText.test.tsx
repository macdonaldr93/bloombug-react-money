import React from 'react';
import * as ReactDOM from 'react-dom';
import { CAD, Mint } from '@bloombug/money';
import currencies from '@bloombug/money/iso-currencies.json';

import { MintProvider } from '../../context';
import { MoneyText } from './MoneyText';

describe('<MoneyText />', () => {
  let div: HTMLDivElement;

  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('returns default format money', () => {
    ReactDOM.render(<MoneyText fractional={100} />, div);

    expect(div).toMatchSnapshot();
  });

  it('returns formatted money', () => {
    const mint = new Mint({ currencies });

    ReactDOM.render(
      <MintProvider mint={mint}>
        <MoneyText fractional={100} currency={CAD} locales="fr-FR" />
      </MintProvider>,
      div
    );

    expect(div).toMatchSnapshot();
  });

  it('returns formatted money with default currency', () => {
    const mint = new Mint({ currencies, defaultLocale: 'en-CA' });

    ReactDOM.render(
      <MintProvider mint={mint}>
        <MoneyText fractional={100} currency={CAD} />
      </MintProvider>,
      div
    );

    expect(div).toMatchSnapshot();
  });
});
