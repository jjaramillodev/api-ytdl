import { isAcceptedOrigins } from '@libs/is-accepted-origins'
import youtubeRouter from '@routes/youtube'
import cors, { type CorsOptions } from 'cors'
import express, { type Request, type Response } from 'express'
import { acceptedOrigins } from './config'

const app = express()

app.disable('x-powered-by')

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (isAcceptedOrigins(origin, acceptedOrigins)) {
      callback(null, true)
      return
    }
    callback(new Error('Not allowed by CORS'))
  },
  optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))

app.get('/', (_req: Request, res: Response) => {
  res.send('Ytdl - MayerCodes')
})

const port = process.env.PORT ?? 80

app.listen(port, () => {
  console.log(`Listen server`)
})

app.use('/youtube', youtubeRouter)

export default app
