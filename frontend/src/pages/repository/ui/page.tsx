import { Group, Stack } from '@mantine/core'
import { useGetFullnameFromURL } from '@shared/lib/git'
import { PageLayout } from '@shared/ui'
import { FileExplorer } from '@widgets/file-explorer'
import { RepositoryAbout } from './repositoryAbout'
import { StatsGraphs } from '@widgets/stats-graphs'

export const RepositoryPage = () => {
  const { owner, repoName } = useGetFullnameFromURL()

  return (
    <PageLayout align='start' withSearch title={`@${owner}/${repoName}`}>
      <Stack w='100%' maw='1300px' p='xl'>
        <Group justify='space-between' align='flex-start'>
          <RepositoryAbout />
          <StatsGraphs />
        </Group>
        <FileExplorer />
      </Stack>
    </PageLayout>
  )
}
