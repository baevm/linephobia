import { Flex, Group, Stack } from '@mantine/core'
import { useGetFullnameFromURL } from '@shared/lib/git'
import { PageLayout } from '@shared/ui'
import { FileExplorer } from '@widgets/file-explorer'
import { RepositoryAbout } from './repositoryAbout'
import { StatsGraphs } from '@widgets/stats-graphs'

export const RepositoryPage = () => {
  const { owner, repoName } = useGetFullnameFromURL()

  return (
    <PageLayout withSearch title={`@${owner}/${repoName}`}>
      <Flex align='center' justify='center' h='100%' w='100%' p='xl'>
        <Stack h='100%' w='100%' maw='1300px'>
          <Group justify='space-between' align='flex-start' gap='xl'>
            <RepositoryAbout />
            <StatsGraphs />
          </Group>
          <FileExplorer />
        </Stack>
      </Flex>
    </PageLayout>
  )
}
