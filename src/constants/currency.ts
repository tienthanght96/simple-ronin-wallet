export enum EnumCurrency {
  USD = 'usd',
  VND = 'vnd',
  EUR = 'eur',
  JPY = 'jpy',
}

export const ExchangeRates = {
  usd: {
    eur: 0.847863,
    jpy: 109.8485,
    usd: 1,
    vnd: 22724.559851,
  },
  eur: {
    eur: 1,
    jpy: 129.56963,
    usd: 1.1797914,
    vnd: 26933.048,
  },
  jpy: {
    eur: 0.007717858,
    jpy: 1,
    usd: 0.0091054622,
    vnd: 207.86544,
  },
  vnd: {
    eur: 0.000037129107,
    jpy: 0.0048108,
    usd: 0.000043804599,
    vnd: 1,
  },
}
