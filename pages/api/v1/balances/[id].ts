import { NextApiRequest, NextApiResponse } from 'next'
import { BalanceModel } from '@/models/BalanceMode'
import BalanceSchema from '@/models/BalanceSchema'

const updateBalanceHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { amount } = req.body
  const balanceId = req.query?.id as string
  const balance = await BalanceSchema.findById(balanceId)

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
      message: 'Could not update your balance!',
    })
  }
  try {
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
        message: 'Could not update your balance!',
      })
    }
  } catch (error) {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Could not update your balance!',
    })
  }
}

const getBalanceHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const balanceId = req.query?.id as string

  if (!balanceId) {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Invalid param!',
    })
  }

  try {
    const data = (await BalanceSchema.findById(balanceId)) as BalanceModel
    if (data) {
      return res.status(200).json({ data: data, status: 'success' })
    } else {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'Could not get your balance!',
      })
    }
  } catch (error) {
    res.status(400).json({
      data: null,
      status: 'error',
      message: 'Could not get your balance!',
    })
  }
}

export default async function balanceHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqMethod = String(req.method).toUpperCase()
  switch (reqMethod) {
    case 'PUT':
      updateBalanceHandler(req, res)
      break
    case 'GET':
      getBalanceHandler(req, res)
      break

    default:
      res.status(400).json({
        data: null,
        status: 'error',
        message: 'Invalid method!',
      })
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
