import { Theme } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState: Theme[] = [
  {
    id: '',
    name: '',
    position: 0,
    emoji: '',
    userEmail: '',
  },
]
export const themeListSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setThemeList: (state, action: PayloadAction<Theme[]>) => {
      state.length = 0
      state.push(...action.payload)
    },
    addTheme: (state, action: PayloadAction<Theme>) => {
      state.push(action.payload)
    },
    deleteTheme: (state, action: PayloadAction<string>) => {
      state.filter(el => el.id != action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTheme, deleteTheme, setThemeList } = themeListSlice.actions
export const themeListReducer = themeListSlice.reducer
export default themeListSlice.reducer
