import { NextApiRequest, NextApiResponse } from 'next'
import { BalanceModel } from '@/models/BalanceMode'
import { dbConnect } from '@/utils/database'
import BalanceSchema from '@/models/BalanceSchema'

export default async function balancesHandler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
  const data = (await BalanceSchema.find()) as BalanceModel[]
  if (data) {
    return res.status(200).json({ data: data, status: 'success' })
  } else {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Could not get your balances!',
    })
  }
}
