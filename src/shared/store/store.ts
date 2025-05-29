import { configureStore } from '@reduxjs/toolkit'
import { canvasReducer } from './slices/canvasSlice'
import { themeListReducer } from './slices/themeListSlice'
import { themeReducer } from './slices/themeSlice'
// ...

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    canvas: canvasReducer,
    themeList: themeListReducer,
  },
})
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
