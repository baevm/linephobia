import { Group } from '@mantine/core'
import { PageLayout } from '@shared/ui'
import { useSearchParams } from 'react-router-dom'
import { RepositoryAbout } from './repositoryAbout'
import { StatsGraphs } from './statsGraphs'

const data = {
  id: 29,
  url: 'https://github.com/baevm/dotfiles',
  owner: 'baevm',
  name: 'dotfiles',
  created_at: '2024-04-13T18:33:16.115342+05:00',
  stats: {
    languages: [
      {
        name: 'TypeScript',
        bytes: 104612,
        lines: 3723,
        code: 2997,
        comment: 166,
        blank: 560,
        complexity: 450,
        count: 65,
        files: [],
      },
      {
        name: 'CSS',
        bytes: 18343,
        lines: 994,
        code: 867,
        comment: 15,
        blank: 112,
        complexity: 0,
        count: 16,
        files: [],
      },
      {
        name: 'JSON',
        bytes: 21927,
        lines: 227,
        code: 226,
        comment: 0,
        blank: 1,
        complexity: 0,
        count: 7,
        files: [],
      },
      {
        name: 'Markdown',
        bytes: 1554,
        lines: 48,
        code: 37,
        comment: 0,
        blank: 11,
        complexity: 0,
        count: 2,
        files: [],
      },
      {
        name: 'Dockerfile',
        bytes: 335,
        lines: 16,
        code: 10,
        comment: 1,
        blank: 5,
        complexity: 0,
        count: 1,
        files: [],
      },
      {
        name: 'HTML',
        bytes: 885,
        lines: 22,
        code: 19,
        comment: 0,
        blank: 3,
        complexity: 0,
        count: 1,
        files: [],
      },
      {
        name: 'Plain Text',
        bytes: 22,
        lines: 2,
        code: 2,
        comment: 0,
        blank: 0,
        complexity: 0,
        count: 1,
        files: [],
      },
      {
        name: 'SVG',
        bytes: 2125,
        lines: 15,
        code: 15,
        comment: 0,
        blank: 0,
        complexity: 0,
        count: 1,
        files: [],
      },
      {
        name: 'TypeScript Typings',
        bytes: 38,
        lines: 1,
        code: 0,
        comment: 1,
        blank: 0,
        complexity: 0,
        count: 1,
        files: [],
      },
      {
        name: 'YAML',
        bytes: 126,
        lines: 9,
        code: 8,
        comment: 0,
        blank: 1,
        complexity: 0,
        count: 1,
        files: [],
      },
      {
        name: 'gitignore',
        bytes: 253,
        lines: 24,
        code: 20,
        comment: 2,
        blank: 2,
        complexity: 0,
        count: 1,
        files: [],
      },
    ],
    total: {
      lines: 5081,
      blank: 695,
      comment: 185,
      code: 4201,
      files: 0,
    },
  },
}

export const RepositoryPage = () => {
  const [searchParams] = useSearchParams()
  const gitUrl = searchParams.get('git_url')

  // const { data } = useGetRepositoryQuery(gitUrl!)
  // console.log(data)

  return (
    <PageLayout align='start' withSearch py='xl'>
      <Group justify='space-between' align='flex-start' w='100%' px='8rem'>
        <RepositoryAbout />
        <StatsGraphs data={data} />
      </Group>
    </PageLayout>
  )
}
