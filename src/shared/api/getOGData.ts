import axios from 'axios'
import { OgObject } from 'open-graph-scraper/types'

export default async function getOGData(data: string) {
  try {
    return await axios.post<OgObject>(`${process.env.NEXT_PUBLIC_URL}/api/og`, {
      url: data,
    })
  } catch {
    console.log('OpenGraph данные не получены')
    return {
      data: {
        ogTitle: '',
        ogImage: [
          {
            url: '',
          },
        ],
      },
    }
  }
}
