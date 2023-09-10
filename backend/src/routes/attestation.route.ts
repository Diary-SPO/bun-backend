import express, { type Request, type Response } from 'express'
import { checkCookie, checkId } from '../middleware'
import {AttestationResponse} from '../../../shared'

const router = express.Router()

router.get('/:id', [checkCookie, checkId], async (req: Request, res: Response) => {
  try {
    const secret = req.headers.secret as string
    const { id } = req.params
    
    const response = await fetch(`${process.env.SERVER_URL}/reports/curator/group-attestation-for-student/${id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Cookie: secret
      },
    });

    const data = await response.json() as AttestationResponse
    res.status(200).json(data)
  } catch (e) {
    console.error('/people/organization', e)
    res.status(500).json(`Internal server error: ${e as string}`)
  }
})

export default router
