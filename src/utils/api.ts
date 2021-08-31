import { VercelRequest, VercelResponse } from '@vercel/node'

import Cors from 'cors'

type CorsType = (
  req: Cors.CorsRequest,
  res: {
    statusCode?: number | undefined
    setHeader(key: string, value: string): any
    end(): any
  },
  next: (err?: any) => any
) => void

export const initMiddleware = (middleware: CorsType) => {
  return (req: VercelRequest, res: VercelResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
