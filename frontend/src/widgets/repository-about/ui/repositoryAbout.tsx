import { useGetRepoQuery, useGetYearlyCommitsQuery } from '@entities/repository/api'
import { Anchor, Badge, Box, Group, Skeleton, Stack, Text, Title, Tooltip, useMantineColorScheme } from '@mantine/core'
import { formatKbToMb, getURLHostname } from '@shared/lib/formatters'
import { useGetFullnameFromURL } from '@shared/lib/git'
import ActivityCalendar, { ThemeInput } from 'react-activity-calendar'
import { IoLogoGithub } from 'react-icons/io5'
import { TbEye, TbGitFork, TbLink, TbStar } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { formatData } from '../lib'
import styles from './styles.module.css'

const calendarTheme: ThemeInput = {
  light: ['#f0f0f0', '#b2f2bb', '#69db7c', '#40c057', '#37b24d', '#2b8a3e'],
  dark: ['#424242', '#b2f2bb', '#69db7c', '#40c057', '#37b24d', '#2b8a3e'],
}

export const RepositoryAbout = () => {
  const { owner, repoName } = useGetFullnameFromURL()
  const { colorScheme } = useMantineColorScheme()
  const { data: repository, isLoading: isRepoLoading, error: repoError } = useGetRepoQuery({ owner, name: repoName })
  const { data: commits, isLoading: isCommitsLoading } = useGetYearlyCommitsQuery({ owner, name: repoName })

  const navigate = useNavigate()
  const schemeForCalendar = colorScheme === 'light' ? 'light' : 'dark'

  if (repoError) {
    navigate('/404')
  }

  if (isRepoLoading) {
    return (
      <Stack maw='450px'>
        <Skeleton height='33px' width='350px' />
        <Skeleton height='20px' width='200px' />
        <Skeleton mt='lg' height='200px' width='450px' />
      </Stack>
    )
  }

  return (
    <Stack maw='640px'>
      <Group align='center'>
        <Group gap='5px' align='center'>
          <IoLogoGithub />
          <Text className={styles.title} size='xl' component={Link} to={repository?.html_url ?? 'https://github.com'}>
            @{repository?.owner.login} / {repository?.name}
          </Text>
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
        {repository?.homepage && (
          <Group gap='5px'>
            <TbLink size='20px' />
            <Anchor href={repository?.homepage} target='_blank'>
              {getURLHostname(repository?.homepage)}
            </Anchor>
          </Group>
        )}
      </Stack>
      <Group gap='xs'>
        {repository?.topics.map((topic) => (
          <Badge key={topic}>{topic}</Badge>
        ))}
      </Group>
      {commits && commits?.length > 0 && (
        <Stack mt='lg'>
          <Title order={4}>Commits</Title>
          <ActivityCalendar
            blockMargin={1}
            blockSize={10}
            maxLevel={5}
            data={formatData(commits)}
            theme={calendarTheme}
            hideTotalCount={true}
            colorScheme={schemeForCalendar}
            showWeekdayLabels
            loading={isCommitsLoading}
            renderBlock={(block, activity) => (
              <Tooltip label={`${activity.count} commits on ${activity.date}`}>{block}</Tooltip>
            )}
          />
        </Stack>
      )}
    </Stack>
  )
}
