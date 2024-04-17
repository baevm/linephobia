import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Repository, RepositoryContent, RepositoryStats } from '../model'
import { getRepoFullname } from '@shared/lib/git'

const STATS_API = 'http://localhost:8080/v1/'
const GITHUB_API = 'https://api.github.com/repos'

type RepoFullname = {
  owner: string
  name: string
}

export const RepositoryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: STATS_API }),
  endpoints: (builder) => ({
    getStats: builder.query<RepositoryStats, string>({
      query: (gitUrl) => `repo?git_url=${encodeURIComponent(gitUrl)}`,
    }),

    getRepoContent: builder.query<RepositoryContent, RepoFullname>({
      queryFn: async ({ name, owner }, _api, _opts, fetchBQ) => {
        // https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
        const content = await fetchBQ(`${GITHUB_API}/${owner}/${name}/contents`)

        return content.data
          ? { data: content.data as RepositoryContent }
          : { error: content.error as FetchBaseQueryError }
      },
    }),

    getRepo: builder.query<Repository, RepoFullname>({
      query: ({ owner, name }) => ({ url: `${GITHUB_API}/${owner}/${name}` }),
    }),
  }),
})

export const { useGetStatsQuery, useLazyGetStatsQuery, useGetRepoContentQuery, useGetRepoQuery } = RepositoryApi
