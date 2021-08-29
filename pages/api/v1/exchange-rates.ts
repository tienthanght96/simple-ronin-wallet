import { NextApiRequest, NextApiResponse } from 'next'
import { readJsonFile } from '@/utils/api'
import { ExchangeRateModel } from '@/models/ExchangeRateModel'

export default async function exchangeRatesHandler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await readJsonFile<Record<string, ExchangeRateModel>>(
    'exchange-rates.json'
  )
  if (data) {
    return res.status(200).json({ data, status: 'success' })
  } else {
    return res
      .status(400)
      .json({
        data: null,
        status: 'error',
        message: 'Could not get list exchange rates!',
      })
  }
}
