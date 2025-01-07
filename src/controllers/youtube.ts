import YoutubeModel from "@models/youtube"
import { Request, Response } from "express"

class YoutubeController {
  private readonly model: YoutubeModel

  constructor ({ model }: { model: YoutubeModel }) {
    this.model = model
  }

  getInfo = async (req: Request, res: Response) => {
    // obtener la URL del video de YouTube de la consulta
    const videoUrl = req.body.url as string
    // si no se proporciona una URL del video de YouTube, devolver un error
    if (!videoUrl) {
      res.status(400).send('Por favor, proporciona una URL del video de YouTube.')
      return
    }
    // obtener la información del video de YouTube
    try {
      const info = await this.model.getInfo(videoUrl)
      res.json(info)
    } catch (error) {
      res.status(500).send('Error al obtener la información del video.')
    }
  }

  download = async (req: Request, res: Response) => {
    // obtener la URL del video de YouTube de la consulta
    const videoUrl = req.body.url as string
    // obtener el formato del video de YouTube de la consulta
    const itag = req.body.itag as number
    // si no se proporciona una URL del video de YouTube, devolver un error
    if (!videoUrl || !itag) {
      res.status(400).send('Por favor, proporciona una URL del video de YouTube y un formato de video.')
      return
    }
    // descargar el video de YouTube
    try {
      const stream = await this.model.download(videoUrl, itag)
      res.header('Content-Disposition', 'attachment; filename="video.mp4"',)
      stream.pipe(res)
    } catch (error) {
      res.status(500).send('Error al descargar el video.')
    }
  }
}

export default YoutubeController