import { NextApiRequest, NextApiResponse } from 'next'
import { writeJsonFile } from '@/utils/api'
import { DefaultMyBalances } from '@/constants/balances'

export default async function resetBalancesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqMethod = String(req.method).toUpperCase()

  if (reqMethod !== 'POST') {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Invalid method!',
    })
  }
  const updateResponse = await writeJsonFile('balances.json', DefaultMyBalances)

  if (updateResponse.data) {
    return res.status(200).json({ data: DefaultMyBalances, status: 'success' })
  } else {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Could not reset your balances!',
    })
  }
}
