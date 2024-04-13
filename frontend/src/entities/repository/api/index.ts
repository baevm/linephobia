import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Repository } from '../model'

const baseUrl = 'http://localhost:8080/v1/'

export const RepositoryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getRepository: builder.query<Repository, string>({
      queryFn: async (url, _queryApi, _extraOptions, fetchBQ) => {
        const repo = await fetchBQ(baseUrl + `repo?git_url=${url}`)

        if (repo.data) return { data: repo.data as Repository }

        if (repo.error && repo.error?.status === 404) {
          const taskPromise = new Promise(async (resolve, reject) => {
            const processTask = (await fetchBQ({
              url: baseUrl + `loc/process`,
              method: 'POST',
              body: {
                git_url: url,
              },
            })) as any

            if (processTask.error) {
              reject(processTask)
            }

            const interval = setInterval(async () => {
              const currentStatus = (await fetchBQ(baseUrl + `loc/check?git_url=${processTask.data.id}`)) as any

              if (currentStatus.error) {
                reject(currentStatus)
              }

              if (currentStatus?.data?.status === 'complete') {
                const newRepo = await fetchBQ(baseUrl + `repo?git_url=${url}`)
                clearInterval(interval)
                resolve(newRepo)
              }
            }, 2000)
          })

          const taskRepo = (await Promise.resolve(taskPromise)) as any

          return taskRepo.data
            ? { data: taskRepo.data as Repository }
            : { error: taskRepo.error as FetchBaseQueryError }
        }

        return repo.data ? { data: repo.data as Repository } : { error: repo.error as FetchBaseQueryError }
      },
    }),
  }),
})

export const { useGetRepositoryQuery, useLazyGetRepositoryQuery } = RepositoryApi
