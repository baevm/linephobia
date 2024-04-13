import { RepositoryApi } from '@entities/repository/api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  [RepositoryApi.reducerPath]: RepositoryApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(RepositoryApi.middleware),
})
