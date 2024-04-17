export const getRepoFullname = (gitUrl: string) => {
  const ownerAndRepoName = new URL(gitUrl).pathname.split('/')

  return { owner: ownerAndRepoName[1], repoName: ownerAndRepoName[2] }
}
