import { RepositoryApi } from '@entities/repository/api'
import { SiteStatsApi } from '@entities/site-stats/api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  [RepositoryApi.reducerPath]: RepositoryApi.reducer,
  [SiteStatsApi.reducerPath]: SiteStatsApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([RepositoryApi.middleware, SiteStatsApi.middleware]),
})
