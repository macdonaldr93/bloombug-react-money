import React from 'react';
import * as ReactDOM from 'react-dom';
import { Mint } from '@bloombug/money';

import { useMint } from '../hooks/useMint';
import { MintProvider } from './MintProvider';

describe('<MintProvider />', () => {
  let div: HTMLDivElement;

  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('returns expected mint in React context', () => {
    const stub = jest.fn();
    const mint = new Mint({ defaultLocale: 'en-CA' });

    const TestComponent = () => {
      const { mint } = useMint();

      stub(mint);

      return <div />;
    };

    ReactDOM.render(
      <MintProvider mint={mint}>
        <TestComponent />
      </MintProvider>,
      div
    );

    expect(stub).toHaveBeenCalledWith(mint);
  });
});
