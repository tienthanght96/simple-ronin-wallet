import { NextApiRequest, NextApiResponse } from 'next'
import { DefaultMyBalances } from '@/constants/balances'
import BalanceSchema from '@/models/BalanceSchema'
import { BalanceModel } from '@/models/BalanceMode'

export default async function resetBalancesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqMethod = String(req.method).toUpperCase()

  DefaultMyBalances

  if (reqMethod !== 'POST') {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Invalid method!',
    })
  }
  try {
    const balances = (await BalanceSchema.find()) as BalanceModel[]

    if (!balances || balances.length < 1) {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'Could not reset your balances!',
      })
    }

    await BalanceSchema.updateMany({}, { $set: { amount: 500 } })
    const updatedBalances = (await BalanceSchema.find()) as BalanceModel[]
    return res.status(200).json({ data: updatedBalances, status: 'success' })
  } catch (error) {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Could not reset your balances!',
    })
  }
}
