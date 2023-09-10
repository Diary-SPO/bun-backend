import express, { type Request, type Response } from 'express'
import {PerformanceCurrent} from '../../../shared'
import { checkCookie, checkId } from '../middleware'

const router = express.Router()

router.get('/:id', [checkId, checkCookie], async (req: Request, res: Response) => {
  try {
    const secret = req.headers.secret as string
    const { id } = req.params
    
    const response = await fetch(`${process.env.SERVER_URL}/reports/current/performance/${id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Cookie: secret
      },
    });

    const data = await response.json() as PerformanceCurrent
    res.status(200).json(data)
  } catch (e) {
    console.error('/reports/current/performance/id', e)
    res.status(500).json(`Internal server error: ${e as string}`)
  }
})

export default router
