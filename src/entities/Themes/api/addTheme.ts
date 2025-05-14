'use server'
import axios from 'axios'
import { AddedTheme } from '../types/types'

export default async function addTheme(theme: AddedTheme) {
  const formData = new FormData()
  formData.append('name', theme.name)
  formData.append('emoji', theme.emoji)
  formData.append('userEmail', theme.userEmail || ('not-found' as string))
  try {
    return (
      await axios.post(`${process.env.NEXTAUTH_URL}/api/themes`, formData)
    ).data
  } catch (err) {
    console.error('Error adding theme:', err)
    return false
  }
}
