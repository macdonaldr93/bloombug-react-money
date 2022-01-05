# @bloombug/react-money

React components and hooks for [@bloombug/money](https://github.com/macdonaldr93/bloombug-money).

## Installation

```shell
npm install @bloombug/react-money --save
```

```shell
yarn add @bloombug/react-money
```

## Getting started

To start, you must wrap your app or part of your app in your `<MintProvider />`.

```jsx
import { Mint } from '@bloombug/money';
import currencies from '@bloombug/money/iso-currencies.json';
import { MintProvider } from '@bloombug/react-money';

const mint = new Mint({ currencies });

const App = () => {
  return (
    <MintProvider mint={mint}>
      <p>Inside this provider, you can use the hooks and components.</p>
      {/* The rest of your app */}
    </MintProvider>
  );
};
```

## Components

### MoneyText

This provides a simple formatted text version of your money.

```jsx
import { MoneyText } from '@bloombug/react-money';

<MoneyText fractional={100} currency="CAD" />
<MoneyText fractional={100} currency="CAD" currencyDisplay="narrowSymbol" />
```

## Hooks

### useMint()

This returns the mint from the provider's context.

```jsx
import { useMint } from '@bloombug/react-money';

const Component = () => {
  const { mint } = useMint();

  return <p>Component</p>;
};
```

### useExchange()

This returns the exchange from the provider's context.

```jsx
import { useExchange } from '@bloombug/react-money';

const Component = () => {
  const { exchange } = useExchange();

  return <p>Component</p>;
};
```

### useCurrency()

This returns the currency from the provider's mint.

```jsx
import { useCurrency } from '@bloombug/react-money';

const Component = () => {
  const { Currency } = useCurrency();

  return <p>{Currency('CAD').name}</p>;
};
```

### useMoney()

This returns the money from the provider's mint.

```jsx
import { useMoney } from '@bloombug/react-money';

const Component = () => {
  const { Money, formatMoney } = useMoney();

  return (
    <div>
      <p>{Money(100).toLocaleString()}</p>
      <p>{formatMoney('en-US', 100, 'CAD')}</p>
    </div>
  );
};
```

## Docs

See [docs site](https://macdonaldr93.github.io/bloombug-money/#/) for more details, API, and other docs.
