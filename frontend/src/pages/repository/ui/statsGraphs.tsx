import { RepositoryStats } from '@entities/repository/model'
import { BarChart, DonutChart, DonutChartCell } from '@mantine/charts'
import { Anchor, Loader, SegmentedControl, Stack, Text } from '@mantine/core'
import { getRepoFullname } from '@shared/lib/git'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type Charts = 'Bar' | 'Pie' | 'Table'

const getPieData = (data?: RepositoryStats): DonutChartCell[] => {
  return (
    data?.stats.languages.map((lang) => ({
      name: lang.name,
      value: lang.lines,
      color: 'yellow.6',
    })) || []
  )
}

const getBarData = (data?: RepositoryStats): Record<string, any>[] => {
  return (
    data?.stats.languages.map((lang) => ({
      language: lang.name,
      Code: lang.code,
      Comments: lang.comment,
      Blank: lang.blank,
    })) || []
  )
}

const renderGraph = (currentChart: string, data?: RepositoryStats) => {
  switch (currentChart) {
    case 'Bar':
      return (
        <BarChart
          h='380px'
          w='100%'
          dataKey='language'
          type='stacked'
          series={[
            { name: 'Code', color: 'violet.6' },
            { name: 'Comments', color: 'blue.6' },
            { name: 'Blank', color: 'teal.6' },
          ]}
          orientation='vertical'
          data={getBarData(data)}
        />
      )
    case 'Pie':
      return (
        <DonutChart
          withLabelsLine
          withLabels
          data={getPieData(data)}
          tooltipDataSource='segment'
          size={300}
          w='100%'
          h='380px'
        />
      )
    case 'Table':
      return 'Table'
    default:
      return null
  }
}

export const StatsGraphs = ({ data }: { data?: RepositoryStats }) => {
  const [currentChart, setCurrentChart] = useState('Bar')
  const [searchParams] = useSearchParams()
  const gitUrl = searchParams.get('git_url') ?? ''

  const { owner, repoName } = getRepoFullname(gitUrl)
  const gitShortName = `@${owner}/${repoName}`

  if (data && data.status === 'pending') {
    return (
      <Stack
        align='center'
        justify='center'
        w='500px'
        h='500px'
        gap='10px'
        p='md'
        style={{ border: '1px solid var(--mantine-color-default-border)', borderRadius: 'var(--mantine-radius-md)' }}>
        <Text ta='center' c='dimmed'>
          Task for processing repository <Anchor href={gitUrl}>{gitShortName}</Anchor> is in queue...
        </Text>
        <Loader type='dots' />
      </Stack>
    )
  }

  if (data && data.status === 'processing') {
    return (
      <Stack
        align='center'
        justify='center'
        w='500px'
        h='500px'
        gap='10px'
        p='md'
        style={{ border: '1px solid var(--mantine-color-default-border)', borderRadius: 'var(--mantine-radius-md)' }}>
        <Text>
          Task for repository <Anchor href={gitUrl}>{gitShortName}</Anchor> is processing...
        </Text>
        <Loader />
      </Stack>
    )
  }

  if (data && data.status === 'error') {
    return (
      <Stack align='center' justify='center' w='500px' h='500px' gap='10px'>
        <Text>Failed to process repository {gitShortName}.</Text>
      </Stack>
    )
  }

  return (
    <Stack w='500px' h='500px' gap='10px'>
      {renderGraph(currentChart, data)}
      <SegmentedControl
        data={[
          { label: 'Bar', value: 'Bar' },
          { label: 'Pie', value: 'Pie' },
          { label: 'Table', value: 'Table', disabled: true },
        ]}
        value={currentChart}
        onChange={setCurrentChart}
      />
    </Stack>
  )
}
