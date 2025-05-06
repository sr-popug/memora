import axios from 'axios'
import { v4 as uuid } from 'uuid'

const registerAPI = {
  create: async (data: FormData, img: File | undefined) => {
    const formData = data

    if (img)
      formData.set(
        'image',
        new File([img], `${uuid()}.${img.type.split('/')[1]}`, {
          type: img.type,
        })
      )

    try {
      await axios.post('/api/user', formData).then(res => {
        console.log(res.data)
      })
    } catch (e) {
      throw e
    }
  },
}
export default registerAPI
