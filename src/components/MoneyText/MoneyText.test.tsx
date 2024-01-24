import React from 'react';
import * as ReactDOM from 'react-dom';
import { CAD, currencies, Mint } from '@bloombug/money';

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
    ReactDOM.render(<MoneyText amount={100} />, div);

    expect(div).toMatchSnapshot();
  });

  it('returns formatted money', () => {
    const mint = new Mint({ currencies });

    ReactDOM.render(
      <MintProvider mint={mint}>
        <MoneyText amount={100} currency={CAD} locales="fr-FR" />
      </MintProvider>,
      div
    );

    expect(div).toMatchSnapshot();
  });

  it('returns formatted money with default currency', () => {
    const mint = new Mint({ currencies, defaultLocale: 'en-CA' });

    ReactDOM.render(
      <MintProvider mint={mint}>
        <MoneyText amount={100} currency={CAD} />
      </MintProvider>,
      div
    );

    expect(div).toMatchSnapshot();
  });

  it('returns formatted money with money type', () => {
    const mint = new Mint({ currencies, defaultLocale: 'en-CA' });

    ReactDOM.render(
      <MintProvider mint={mint}>
        <MoneyText amount={mint.Money(100, CAD)} />
      </MintProvider>,
      div
    );

    expect(div).toMatchSnapshot();
  });
});
