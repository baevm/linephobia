import { RepositoryStats } from '@entities/repository/model'
import { BarChart, DonutChart } from '@mantine/charts'
import { getBarData, getPieData } from '../lib'
import { Charts } from '../model'

type Props = {
  currentChart: Charts
  data?: RepositoryStats
}

export const RenderGraph = ({ currentChart, data }: Props) => {
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
      return <div>Table</div>
    default:
      return null
  }
}
