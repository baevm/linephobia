import { useGetRepositoryQuery } from '@entities/repository/api'
import { Anchor, Badge, Box, Flex, Group, NavLink, Stack, Text, Title } from '@mantine/core'
import { PageLayout } from '@shared/ui'
import { useSearchParams } from 'react-router-dom'
import { TbEye, TbGitFork, TbLink, TbStar } from 'react-icons/tb'

const data = {
  id: 29,
  url: 'https://github.com/baevm/dotfiles',
  owner: 'baevm',
  name: 'dotfiles',
  created_at: '2024-04-13T18:33:16.115342+05:00',
  stats: {
    languages: [
      {
        name: 'JSON',
        bytes: 163006,
        lines: 5968,
        code: 5965,
        comment: 0,
        blank: 3,
        complexity: 0,
        count: 4,
        files: [],
      },
      {
        name: 'Zsh',
        bytes: 90939,
        lines: 1770,
        code: 451,
        comment: 1124,
        blank: 195,
        complexity: 38,
        count: 2,
        files: [],
      },
      {
        name: 'Markdown',
        bytes: 4177,
        lines: 137,
        code: 105,
        comment: 0,
        blank: 32,
        complexity: 0,
        count: 1,
        files: [],
      },
    ],
    total: {
      lines: 7875,
      blank: 230,
      comment: 1124,
      code: 6521,
      files: 0,
    },
  },
}

export const RepositoryPage = () => {
  const [searchParams] = useSearchParams()
  const gitUrl = searchParams.get('git_url')

  // const { data } = useGetRepositoryQuery(gitUrl!)

  console.log(data)

  return (
    <PageLayout align='start'>
      <Group justify='space-between' w='100%' px='10rem'>
        <RepositoryAbout />
        <Box>Graph</Box>
      </Group>
    </PageLayout>
  )
}

export const RepositoryAbout = () => {
  return (
    <Stack>
      <Group align='center'>
        <Title order={3}>facebook / react</Title>
        <Badge color='gray' variant='light'>
          100 MB
        </Badge>
      </Group>
      <Group>
        <Badge color='gray' radius='sm' variant='outline'>
          <Group align='center'>
            <TbEye />
            <Box>3000</Box>
          </Group>
        </Badge>
        <Badge color='gray' radius='sm' variant='outline'>
          <Group align='center'>
            <TbGitFork />
            <Box>3000</Box>
          </Group>
        </Badge>
        <Badge color='gray' radius='sm' variant='outline'>
          <Group align='center'>
            <TbStar />
            <Box>3000</Box>
          </Group>
        </Badge>
      </Group>
      <Stack mt='lg' gap='xs'>
        <Title order={4}>About</Title>
        <Text>The library for web and native user interfaces.</Text>
        <Group gap='5px'>
          <TbLink size='20px' />
          <Anchor href='https://react.dev' target='_blank'>
            react.dev
          </Anchor>
        </Group>
      </Stack>
    </Stack>
  )
}
