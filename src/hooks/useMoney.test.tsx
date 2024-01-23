import React from 'react';
import * as ReactDOM from 'react-dom';
import { Mint, CAD, USD, currencies } from '@bloombug/money';

import { isCurrencyOptions, isLocalesOptions, useMoney } from './useMoney';
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

  describe('formatMoney()', () => {
    it('returns expected format with fractional', () => {
      const mint = new Mint({ currencies, defaultCurrency: CAD });
      let rendered: any;

      const TestComponent = () => {
        const { formatMoney } = useMoney();
        rendered = formatMoney(100);

        return <div />;
      };

      ReactDOM.render(
        <MintProvider mint={mint}>
          <TestComponent />
        </MintProvider>,
        div
      );

      expect(rendered).toEqual('CA$1.00');
    });

    it('returns expected format with fractional and options', () => {
      const mint = new Mint({ currencies, defaultCurrency: CAD });
      let rendered: any;

      const TestComponent = () => {
        const { formatMoney } = useMoney();
        rendered = formatMoney(100, { notation: 'scientific' });

        return <div />;
      };

      ReactDOM.render(
        <MintProvider mint={mint}>
          <TestComponent />
        </MintProvider>,
        div
      );

      expect(rendered).toEqual('CA$1.00E0');
    });

    it('returns expected format with fractional and currency', () => {
      const mint = new Mint({ currencies, defaultCurrency: CAD });
      let rendered: any;

      const TestComponent = () => {
        const { formatMoney } = useMoney();
        rendered = formatMoney(100, USD);

        return <div />;
      };

      ReactDOM.render(
        <MintProvider mint={mint}>
          <TestComponent />
        </MintProvider>,
        div
      );

      expect(rendered).toEqual('$1.00');
    });

    it('returns expected format with fractional, currency and options', () => {
      const mint = new Mint({ currencies, defaultCurrency: CAD });
      let rendered: any;

      const TestComponent = () => {
        const { formatMoney } = useMoney();
        rendered = formatMoney(100, USD, { notation: 'scientific' });

        return <div />;
      };

      ReactDOM.render(
        <MintProvider mint={mint}>
          <TestComponent />
        </MintProvider>,
        div
      );

      expect(rendered).toEqual('$1.00E0');
    });

    it('returns expected format with fractional, currency and locales', () => {
      const mint = new Mint({ currencies, defaultCurrency: CAD });
      let rendered: any;

      const TestComponent = () => {
        const { formatMoney } = useMoney();
        rendered = formatMoney(100, USD, 'en-CA');

        return <div />;
      };

      ReactDOM.render(
        <MintProvider mint={mint}>
          <TestComponent />
        </MintProvider>,
        div
      );

      expect(rendered).toEqual('US$1.00');
    });

    it('returns expected format with fractional, currency, locales and options', () => {
      const mint = new Mint({ currencies, defaultCurrency: CAD });
      let rendered: any;

      const TestComponent = () => {
        const { formatMoney } = useMoney();
        rendered = formatMoney(100, USD, 'en-CA', { notation: 'scientific' });

        return <div />;
      };

      ReactDOM.render(
        <MintProvider mint={mint}>
          <TestComponent />
        </MintProvider>,
        div
      );

      expect(rendered).toEqual('US$1.00E0');
    });
  });

  describe('isCurrencyOptions()', () => {
    it('returns false for string', () => {
      expect(isCurrencyOptions('')).toBeFalsy();
    });

    it('returns false for null', () => {
      expect(isCurrencyOptions(null)).toBeFalsy();
    });

    it('returns true for object', () => {
      expect(isCurrencyOptions({})).toBeTruthy();
    });
  });

  describe('isLocalesOptions()', () => {
    it('returns false for string', () => {
      expect(isLocalesOptions('')).toBeFalsy();
    });

    it('returns false for null', () => {
      expect(isLocalesOptions([''])).toBeFalsy();
    });

    it('returns true for object', () => {
      expect(isLocalesOptions({})).toBeTruthy();
    });
  });
});
