import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState = {
  id: '',
}
export const themeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setThemeId: (state, action: PayloadAction<{ id: string }>) => {
      state.id = action.payload.id
    },
  },
})

// Action creators are generated for each case reducer function
export const { setThemeId } = themeSlice.actions
export const themeReducer = themeSlice.reducer
export default themeSlice.reducer
