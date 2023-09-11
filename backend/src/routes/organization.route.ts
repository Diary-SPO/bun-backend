import express, { type Request, type Response } from 'express'
import { checkCookie } from '../middleware'
import {Organization} from '../../../shared'

const router = express.Router()

router.get('/', [checkCookie], async (req: Request, res: Response) => {
  try {
    const secret = req.headers.secret as string
    
    const response = await fetch(`https://poo.tomedu.ru/services/people/organization`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Cookie: secret
      },
    });

    const data = await response.json() as Organization
    res.status(200).json(data)
  } catch (e) {
    console.error('/people/organization', e)
    res.status(500).json(`Internal server error: ${e as string}`)
  }
})

export default router
