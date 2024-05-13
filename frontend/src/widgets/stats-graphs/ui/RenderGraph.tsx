import { RepositoryStats } from '@entities/repository/model'
import { BarChart, DonutChart } from '@mantine/charts'
import { Table, Text } from '@mantine/core'
import { LANGUAGE_COLORS, getBarData, getDonutData } from '../lib'
import { Charts } from '../model'
import { useMemo } from 'react'

type Props = {
  currentChart: Charts
  data?: RepositoryStats
}

export const RenderGraph = ({ currentChart, data }: Props) => {
  switch (currentChart) {
    case 'Bar':
      return (
        <BarChart
          h='500px'
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
          w='100%'
          h='500px'
          withLabelsLine
          withLabels
          data={getDonutData(data)}
          tooltipDataSource='segment'
          size={300}
        />
      )
    case 'Table':
      return <TotalTable data={data} />
    default:
      return null
  }
}

const TotalTable = ({ data }: { data?: RepositoryStats }) => {
  const ths = (
    <Table.Tr>
      <Table.Th>Language</Table.Th>
      <Table.Th>Lines</Table.Th>
      <Table.Th>Code</Table.Th>
      <Table.Th>Comment</Table.Th>
      <Table.Th>Blank</Table.Th>
    </Table.Tr>
  )

  const tfs = (
    <Table.Tr>
      <Table.Th></Table.Th>
      <Table.Th>Lines</Table.Th>
      <Table.Th>Code</Table.Th>
      <Table.Th>Comment</Table.Th>
      <Table.Th>Blank</Table.Th>
    </Table.Tr>
  )

  const total = (
    <Table.Tr>
      <Table.Td>
        <Text size='sm' fw='bold'>
          Total
        </Text>
      </Table.Td>
      <Table.Td>{data?.stats.total.lines}</Table.Td>
      <Table.Td>{data?.stats.total.code}</Table.Td>
      <Table.Td>{data?.stats.total.comment}</Table.Td>
      <Table.Td>{data?.stats.total.blank}</Table.Td>
    </Table.Tr>
  )

  const rows = useMemo(() => {
    return data?.stats.languages
      .slice()
      .sort((a, b) => b.lines - a.lines)
      .map((lang) => (
        <Table.Tr key={lang.name}>
          <Table.Td>
            <Text size='sm' fw='bold' c={LANGUAGE_COLORS[lang.name] ?? 'gray'}>
              {lang.name}
            </Text>
          </Table.Td>
          <Table.Td>{lang.lines}</Table.Td>
          <Table.Td>{lang.code}</Table.Td>
          <Table.Td>{lang.comment}</Table.Td>
          <Table.Td>{lang.blank}</Table.Td>
        </Table.Tr>
      ))
  }, [data])

  return (
    <Table.ScrollContainer minWidth={300} mah={'500px'}>
      <Table withColumnBorders>
        <Table.Thead>{ths}</Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Tfoot>
          {tfs}
          {total}
        </Table.Tfoot>
      </Table>
    </Table.ScrollContainer>
  )
}
