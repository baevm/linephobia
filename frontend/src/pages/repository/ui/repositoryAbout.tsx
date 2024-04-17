import { Repository } from '@entities/repository/model'
import { Anchor, Badge, Box, Group, Stack, Text, Title } from '@mantine/core'
import { formatKbToMb, getURLHostname } from '@shared/lib/formatters'
import { TbEye, TbGitFork, TbLink, TbStar } from 'react-icons/tb'
import { IoLogoGithub } from 'react-icons/io5'

export const RepositoryAbout = ({ repository }: { repository?: Repository }) => {
  return (
    <Stack maw='450px'>
      <Group align='center'>
        <Group gap='5px' align='center'>
          <IoLogoGithub size='24px' />

          <Title order={3}>
            @{repository?.owner.login} / {repository?.name}
          </Title>
        </Group>
        <Badge color='gray' variant='light'>
          {formatKbToMb(repository?.size)}
        </Badge>
      </Group>
      <Group>
        <Badge color='gray' radius='sm' variant='outline'>
          <Group align='center'>
            <TbEye />
            <Box>{repository?.subscribers_count}</Box>
          </Group>
        </Badge>
        <Badge color='gray' radius='sm' variant='outline'>
          <Group align='center'>
            <TbGitFork />
            <Box>{repository?.forks_count}</Box>
          </Group>
        </Badge>
        <Badge color='gray' radius='sm' variant='outline'>
          <Group align='center'>
            <TbStar />
            <Box>{repository?.stargazers_count}</Box>
          </Group>
        </Badge>
      </Group>
      <Stack mt='lg' gap='xs'>
        {repository?.description && (
          <>
            <Title order={4}>About</Title>
            <Text>{repository?.description}</Text>
          </>
        )}
        <Group gap='5px'>
          <TbLink size='20px' />
          <Anchor href={repository?.homepage} target='_blank'>
            {getURLHostname(repository?.homepage)}
          </Anchor>
        </Group>
      </Stack>
      <Group gap='xs'>
        {repository?.topics.map((topic) => (
          <Badge>{topic}</Badge>
        ))}
      </Group>
    </Stack>
  )
}