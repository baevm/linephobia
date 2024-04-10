import { Flex, Stack } from '@mantine/core'
import { HomeSearch } from '@widgets/home-search'

export const Page = () => {
  return (
    <Flex align='center' justify='center' h='100%' w='100%'>
      <Stack maw='40rem' w='100%'>
        <HomeSearch />
      </Stack>
    </Flex>
  )
}
