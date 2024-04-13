type Language = {
  blank: number
  bytes: number
  code: number
  comment: number
  complexity: number
  count: number
  files: string[]
  lines: number
  name: string
}

type RepoStats = {
  languages: Language[]
  total: {
    blank: number
    code: number
    comment: number
    files: number
    lines: number
  }
}

export type Repository = {
  id: string
  url: string
  owner: string
  name: string
  created_at: string
  stats: RepoStats
}
