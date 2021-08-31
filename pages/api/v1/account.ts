import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '@/utils/database'
import AccountSchema from '@/models/AccountInfoSchema'

export default async function accountInfoHandler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect()
    const data = await AccountSchema.findOne()
    if (data) {
      return res.status(200).json({ data, status: 'success' })
    } else {
      return res.status(400).json({
        data: null,
        status: 'error',
        message: 'Could not get your account info!',
        url: process.cwd(),
      })
    }
  } catch (error) {
    return res.status(400).json({
      data: null,
      status: 'error',
      message: 'Could not get your account info!',
      url: process.cwd(),
    })
  }
}
