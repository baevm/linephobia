import { useGetStatsQuery } from '@entities/repository/api'
import { Anchor, Loader, SegmentedControl, Stack, Text } from '@mantine/core'
import { useGetFullnameFromURL } from '@shared/lib/git'
import { useEffect, useState } from 'react'
import { RenderGraph } from './RenderGraph'
import { Charts } from '../model'

// TODO: при больщом количестве языков они не отображаются в легенде на графах
// добавить общее число строк во всем репозитории
export const StatsGraphs = () => {
  const [refetchTimeout, setRefetchTimeout] = useState(3000)
  const [currentChart, setCurrentChart] = useState<Charts>('Bar')
  const { owner, repoName, gitUrl } = useGetFullnameFromURL()

  const formattedName = `@${owner}/${repoName}`

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
    } else if (!isStatsLoading && isError) {
      setRefetchTimeout(0)
    } else {
      setRefetchTimeout(3000) // ????
    }
  }, [stats, isStatsLoading, isError, setRefetchTimeout])

  if (stats && stats.status === 'pending') {
    return (
      <Stack
        align='center'
        justify='center'
        w='500px'
        h='570px'
        gap='10px'
        p='md'
        style={{ border: '1px solid var(--mantine-color-default-border)', borderRadius: 'var(--mantine-radius-md)' }}>
        <Text ta='center' c='dimmed'>
          Task for processing repository <Anchor href={gitUrl}>{formattedName}</Anchor> is in queue...
        </Text>
        <Loader type='dots' />
      </Stack>
    )
  }

  if (stats && stats.status === 'processing') {
    return (
      <Stack
        align='center'
        justify='center'
        w='500px'
        h='570px'
        gap='10px'
        p='md'
        style={{ border: '1px solid var(--mantine-color-default-border)', borderRadius: 'var(--mantine-radius-md)' }}>
        <Text ta='center' c='dimmed'>
          Task for repository <Anchor href={gitUrl}>{formattedName}</Anchor> is processing...
        </Text>
        <Loader type='dots' />
      </Stack>
    )
  }

  if (stats && stats.status === 'error') {
    return (
      <Stack align='center' justify='center' w='500px' h='570px' gap='10px'>
        <Text ta='center' c='red'>
          Failed to process repository {formattedName}.
        </Text>
      </Stack>
    )
  }

  if (!isStatsLoading && isError) {
    return (
      <Stack align='center' justify='center' w='500px' h='570px' gap='10px'>
        <Text>Failed to process repository {formattedName}.</Text>
      </Stack>
    )
  }

  return (
    <Stack w='500px' h='570px' gap='10px'>
      <RenderGraph currentChart={currentChart} data={stats} />
      <SegmentedControl
        data={[
          { label: 'Bar', value: 'Bar' },
          { label: 'Pie', value: 'Pie' },
          { label: 'Table', value: 'Table' },
        ]}
        value={currentChart}
        onChange={(v) => setCurrentChart(v as Charts)}
      />
    </Stack>
  )
}
