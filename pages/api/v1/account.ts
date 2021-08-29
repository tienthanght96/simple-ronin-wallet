import { NextApiRequest, NextApiResponse } from 'next'
import { readJsonFile } from '@/utils/api'
import { AccountInfoModel } from '@/models/AccountInfoModel'

export default async function accountInfoHandler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await readJsonFile<AccountInfoModel>('account.json')
  if (data) {
    return res.status(200).json({ data, status: 'success' })
  } else {
    return res
      .status(400)
      .json({
        data: null,
        status: 'error',
        message: 'Could not get your account info!',
      })
  }
}
