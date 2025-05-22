import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState = {
  width: 1200,
}
export const canvasSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setWidth: (state, action: PayloadAction<{ width: number }>) => {
      state.width = action.payload.width
    },
  },
})

// Action creators are generated for each case reducer function
export const { setWidth } = canvasSlice.actions
export const canvasReducer = canvasSlice.reducer
export default canvasSlice.reducer
