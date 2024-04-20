import { RepositoryContent } from '@entities/repository/model'

const order = {
  dir: 1,
  file: 2,
}

export const sortFilesByType = (files: RepositoryContent[]) => {
  return files.sort((a, b) => order[a.type] - order[b.type])
}
