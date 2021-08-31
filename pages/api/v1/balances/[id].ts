import { NextApiRequest, NextApiResponse } from 'next'
import { BalanceModel } from '@/models/BalanceMode'
import BalanceSchema from '@/models/BalanceSchema'

export default async function updateBalanceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqMethod = String(req.method).toUpperCase()
  const { amount } = req.body
  const balanceId = req.query?.id as string
  const balance = await BalanceSchema.findById(balanceId)

  if (reqMethod !== 'PUT') {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Invalid method!',
    })
  }

  if (!balanceId || !amount) {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Invalid params!',
    })
  }

  if (!balance) {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Could not update your balances!',
    })
  }

  await BalanceSchema.findByIdAndUpdate(balanceId, {
    amount: balance.amount - amount,
  })
  const data = (await BalanceSchema.findById(balanceId)) as BalanceModel

  if (data) {
    return res.status(200).json({ data: data, status: 'success' })
  } else {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Could not update your balances!',
    })
  }
}
