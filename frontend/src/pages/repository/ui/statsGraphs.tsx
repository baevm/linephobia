import { Repository } from '@entities/repository/model'
import { BarChart, DonutChart, DonutChartCell } from '@mantine/charts'
import { SegmentedControl, Stack } from '@mantine/core'
import { useState } from 'react'

const getPieData = (data: Repository): DonutChartCell[] => {
  return data.stats.languages.map((lang) => ({
    name: lang.name,
    value: lang.lines,
    color: 'yellow.6',
  }))
}

const getBarData = (data: Repository): Record<string, any>[] => {
  return data.stats.languages.map((lang) => ({
    language: lang.name,
    Code: lang.code,
    Comments: lang.comment,
    Blank: lang.blank,
  }))
}

export const StatsGraphs = ({ data }: { data: Repository }) => {
  const [currentChart, setCurrentChart] = useState('Bar')

  const renderGraph = () => {
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

  return (
    <Stack w='500px' h='500px' gap='10px'>
      {renderGraph()}
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
