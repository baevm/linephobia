import { useSearchParams } from 'react-router-dom'

export const getRepoFullname = (gitUrl: string) => {
  const ownerAndRepoName = new URL(gitUrl).pathname.split('/')

  return { owner: ownerAndRepoName[1], repoName: ownerAndRepoName[2] }
}

export const useGetFullnameFromURL = () => {
  const [searchParams] = useSearchParams()
  const gitUrl = searchParams.get('git_url') || ''
  const { owner, repoName } = getRepoFullname(gitUrl)

  return { owner, repoName, gitUrl }
}
