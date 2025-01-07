import YoutubeController from '@controllers/youtube'
import YoutubeModel from '@models/youtube'
import { Router } from 'express'

const youtubeRouter = Router()

const youtubeController = new YoutubeController({ model: new YoutubeModel() })

youtubeRouter.post('/info', youtubeController.getInfo)

youtubeRouter.post('/download', youtubeController.download)

export default youtubeRouter
