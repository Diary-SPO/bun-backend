import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.send(`Hello ${process.env.SERVER_URL} https://poo.tomedu.ru/services`)
})

export default router
