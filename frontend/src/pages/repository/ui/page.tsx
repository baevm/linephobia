import { Group, Loader, Stack, Text } from '@mantine/core'
import { PageLayout } from '@shared/ui'
import { FileExplorer } from '@widgets/file-explorer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RepositoryAbout } from './repositoryAbout'
import { StatsGraphs } from './statsGraphs'
import { useGetRepoQuery, useGetStatsQuery } from '@entities/repository/api'
import { useEffect, useState } from 'react'
import { getRepoFullname } from '@shared/lib/git'

export const RepositoryPage = () => {
  const [searchParams] = useSearchParams()
  const [refetchTimeout, setRefetchTimeout] = useState(3000)
  const gitUrl = searchParams.get('git_url') || ''
  const { owner, repoName } = getRepoFullname(gitUrl)
  const navigate = useNavigate()

  const { data: repo, isLoading: isRepoLoading, error: repoError } = useGetRepoQuery({ owner, name: repoName })

  const {
    data: stats,
    isLoading: isStatsLoading,
    isError,
  } = useGetStatsQuery(gitUrl!, {
    pollingInterval: refetchTimeout,
  })

  useEffect(() => {
    if (stats && stats.status === 'complete') {
      setRefetchTimeout(0)
    }
  }, [stats])

  if (repoError) {
    navigate('/404')
  }

  return (
    <PageLayout align='start' withSearch>
      <Stack w='100%' maw='1300px' p='xl'>
        <Group justify='space-between' align='flex-start'>
          <RepositoryAbout repository={repo} />
          <StatsGraphs data={stats} />
        </Group>
        <FileExplorer />
      </Stack>
    </PageLayout>
  )
}
