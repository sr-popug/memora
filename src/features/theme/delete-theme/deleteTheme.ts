'use server'
import axios from 'axios'

export default async function deleteTheme(id: string) {
  return await axios.delete(`${process.env.NEXTAUTH_URL}/api/themes`, {
    params: { id },
  })
}
