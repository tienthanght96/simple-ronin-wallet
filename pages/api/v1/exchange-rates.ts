import { NextApiRequest, NextApiResponse } from 'next'
import { ExchangeRates } from '@/constants/currency'

export default async function exchangeRatesHandler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ data: ExchangeRates, status: 'success' })
}
