import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './redux/projectSlice'

export const store = configureStore({
  reducer: {
    projectsReducer,
  },
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
