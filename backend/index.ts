import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cors from 'cors'
import { corsMiddleware, preventCrossSiteScripting } from './src/middleware'
import {
  attestation, helloRoute, lessonsRoute, loginRoute, organization, performanceCurrent, adsRoute
} from './src/routes'

const app = express()
const port = process.env.PORT ?? 3000

app.use(preventCrossSiteScripting)
app.use(helmet())

const FIFTEEN_MINS_IN_MS = 900000

app.use(express.json())

const limiter = rateLimit({
  windowMs: FIFTEEN_MINS_IN_MS,
  max: 80,
  statusCode: 429,
  skipFailedRequests: true,
  message: 'LIMIT'
})

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 204
}))

app.use(limiter)
// app.use(corsMiddleware)

app.use('/performance.current', performanceCurrent)
app.use('/attestation', attestation)
app.use('/organization', organization)
app.use('/lessons', lessonsRoute)
app.use('/login', loginRoute)
app.use('/ads', adsRoute)
app.use('/', helloRoute)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
