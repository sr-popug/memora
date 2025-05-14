import { Theme } from '@prisma/client'

type AddedTheme = Omit<Theme, 'position' | 'id'>
export type { AddedTheme }
