import { SearchInput } from '@features/search-input'
import { SearchTabs } from '@features/search-tabs'
import { Stack, Text } from '@mantine/core'

export const HomeSearch = () => {
  return (
    <Stack align='center' gap='xs'>
      <Text fw={700} size='36px' variant='gradient' gradient={{ from: 'violet', to: 'blue', deg: 90 }}>
        LINEPHOBIA
      </Text>
      <Text c='dimmed'>Find count of lines of any git repository</Text>
      <SearchInput size='xl' />
      <SearchTabs />
    </Stack>
  )
}
