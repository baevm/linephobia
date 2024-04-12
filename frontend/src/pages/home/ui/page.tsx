import { Stack } from '@mantine/core'
import { PageLayout } from '@shared/ui'
import { HomeSearch } from '@widgets/home-search'

export const Page = () => {
  return (
    <PageLayout>
      <Stack maw='40rem' w='100%'>
        <HomeSearch />
      </Stack>
    </PageLayout>
  )
}
