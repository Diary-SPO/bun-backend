import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('He1llo')
})

export default router
