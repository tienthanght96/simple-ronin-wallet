import { NextApiRequest, NextApiResponse } from 'next'
import { readJsonFile } from '@/utils/api'
import { BalanceModel } from '@/models/BalanceMode'

export default async function balancesHandler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await readJsonFile<BalanceModel[]>('balances.json')

  if (data) {
    return res.status(200).json({ data, status: 'success' })
  } else {
    return res
      .status(400)
      .json({
        data: null,
        status: 'error',
        message: 'Could not get your balances!',
      })
  }
}
