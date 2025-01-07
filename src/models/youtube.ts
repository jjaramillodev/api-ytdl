import ytdl from '@distube/ytdl-core'
import internal from 'stream'

class YoutubeModel {
  async getInfo (videoUrl: string) {
    const info = await ytdl.getInfo(videoUrl)
    const formats = ytdl.filterFormats(info.formats, 'audioandvideo')
    const qualities = formats.map((format) => ({
      quality: format.qualityLabel,
      itag: format.itag,
      mimeType: format.mimeType
    }))
    return {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0].url,
      qualities
    }
  }

  async download (videoUrl: string, itag: number): Promise<internal.Readable> {
    const stream = ytdl(videoUrl, { filter: (format) => format.itag === itag })
    return stream
  }
}

export default YoutubeModel