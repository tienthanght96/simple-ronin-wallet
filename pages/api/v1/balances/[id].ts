import { NextApiRequest, NextApiResponse } from 'next'
import { readJsonFile, writeJsonFile } from '@/utils/api'
import { BalanceModel } from '@/models/BalanceMode'

export default async function updateBalanceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: balances } = await readJsonFile<BalanceModel[]>('balances.json')
  const reqMethod = String(req.method).toUpperCase()
  const { amount } = req.body
  const balanceId = parseInt(req.query?.id as string)
  const balanceIndex = balances
    ? balances.findIndex((balance) => balance.id === balanceId)
    : -1

  if (reqMethod !== 'PUT') {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Invalid method!',
    })
  }

  if (balanceIndex < 0 || !amount) {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Invalid params!',
    })
  }

  if (!balances) {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Could not update your balances!',
    })
  }

  const updatedBalance = {
    ...balances[balanceIndex],
    amount: balances[balanceIndex].amount - amount,
  }

  const updatedBalances = [
    ...balances.slice(0, balanceIndex),
    updatedBalance,
    ...balances.slice(balanceIndex + 1),
  ]

  const updateResponse = await writeJsonFile('balances.json', updatedBalances)

  if (updateResponse.data) {
    return res.status(200).json({ data: updatedBalances, status: 'success' })
  } else {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Could not update your balances!',
    })
  }
}
