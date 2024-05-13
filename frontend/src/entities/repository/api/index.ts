import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CommitsPerWeek, Repository, RepositoryContent, RepositoryStats, SearchRepositories } from '../model'
import { getRepoFullname } from '@shared/lib/git'
import { GITHUB_API, STATS_API } from '@shared/consts'

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

    getRepoContent: builder.query<RepositoryContent[], string>({
      queryFn: async (gitUrl, _api, _opts, fetchBQ) => {
        const { owner, repoName } = getRepoFullname(gitUrl)
        const url = new URL(gitUrl)
        const fetchApiUrl =
          url.host === 'api.github.com' ? url.href : `${GITHUB_API}/repos/${owner}/${repoName}/contents`

        // https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
        const content = await fetchBQ(fetchApiUrl)

        return content.data
          ? { data: content.data as RepositoryContent[] }
          : { error: content.error as FetchBaseQueryError }
      },
    }),

    getRepo: builder.query<Repository, RepoFullname>({
      query: ({ owner, name }) => ({ url: `${GITHUB_API}/repos/${owner}/${name}` }),
    }),

    searchRepos: builder.query<SearchRepositories, string>({
      query: (searchQuery) => ({
        url: `${GITHUB_API}/search/repositories?q=${encodeURIComponent(
          `${searchQuery} in:name`
        )}&per_page=10&sort=stars`,
      }),
    }),

    getYearlyCommits: builder.query<CommitsPerWeek[], RepoFullname>({
      query: ({ owner, name }) => ({
        url: `${GITHUB_API}/repos/${owner}/${name}/stats/commit_activity`,
      }),
    }),
  }),
})

export const {
  useGetStatsQuery,
  useLazyGetStatsQuery,
  useGetRepoContentQuery,
  useGetRepoQuery,
  useSearchReposQuery,
  useLazySearchReposQuery,
  useGetYearlyCommitsQuery,
} = RepositoryApi
