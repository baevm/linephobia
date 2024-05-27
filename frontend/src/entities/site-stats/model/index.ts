import { RepositoryStats } from '@entities/repository/model'

export type Popular = Omit<RepositoryStats, 'stats' | 'status'> & {
  search_count: number
}

export type Recent = Omit<RepositoryStats, 'stats' | 'status'>

export type SiteStats = {
  popular: Popular[]
  recent: Recent[]
}
