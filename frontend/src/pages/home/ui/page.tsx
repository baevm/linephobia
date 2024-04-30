import { Flex, Stack } from '@mantine/core'
import { PageLayout } from '@shared/ui'
import { HomeSearch } from '@widgets/home-search'

export const Page = () => {
  return (
    <PageLayout>
      <Flex align={'center'} justify='center' h='calc(100vh - 3.5rem)' w='100%' p='xl'>
        <Stack maw='40rem' w='100%'>
          <HomeSearch />
        </Stack>
      </Flex>
    </PageLayout>
  )
}
