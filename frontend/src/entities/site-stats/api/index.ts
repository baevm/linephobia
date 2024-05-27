import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { STATS_API } from '@shared/consts'
import { SiteStats } from '../model'

export const SiteStatsApi = createApi({
  reducerPath: 'site-stats',
  baseQuery: fetchBaseQuery({ baseUrl: STATS_API }),
  endpoints: (builder) => ({
    getRecentPopular: builder.query<SiteStats, void>({
      query: () => `global-stats`,
    }),
  }),
})

export const { useGetRecentPopularQuery } = SiteStatsApi
