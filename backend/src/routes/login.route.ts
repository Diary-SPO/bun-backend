import express, { type Request, type Response } from 'express'
import { type AuthData } from '../../../shared'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  const { login, password } = req.body
  
  console.log('login', login)
  
  if (!login || !password || typeof login !== 'string' || typeof password !== 'string') {
    return res.status(400).json('Invalid login or password')
  }

  try {
    const response = await fetch(`https://poo.tomedu.ru/services/security/login`, {
      method: "POST",
      body: JSON.stringify({ login, password, isRemember: true }),
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    });

    const data = await response.json() as AuthData;

    const setCookieHeader = response.headers.getAll("Set-Cookie")
    const cookieString = Array.isArray(setCookieHeader) ? setCookieHeader.join('; ') : setCookieHeader

    return res.status(response.status).json({ data, cookie: cookieString })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message) {
        return res.status(500).json(error.message)
      } else {
        console.error('/login', error)
        return res.status(500).json(`Internal server error: ${error}`)
      }
    } else {
      console.error('/login', error)
      return res.status(500).json(`Internal server error: ${error}`)
    }
  }
})

export default router
