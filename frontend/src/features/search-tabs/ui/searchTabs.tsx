import { Box, Group, Skeleton, Tabs } from '@mantine/core'
import { useMemo, useState } from 'react'
import styles from './styles.module.css'
import { getSearchHistory } from '@features/search-input'
import { getRepoFullname } from '@shared/lib/git'
import { useGetRecentPopularQuery } from '@entities/site-stats/api'
import { LinkItem } from './linkItem'

export const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>('recent')
  const { data, isLoading } = useGetRecentPopularQuery()

  const recent = data ? data.recent.slice(0, 4) : []
  const popular = data ? data.popular.slice(0, 4) : []
  const history = useMemo(() => {
    return getSearchHistory()
      .map((item) => {
        const { owner, repoName } = getRepoFullname(item.html_url)
        return { owner, name: repoName, url: item.html_url }
      })
      .slice(0, 4)
  }, [])

  return (
    <Tabs value={activeTab} onChange={setActiveTab} w='100%'>
      <Tabs.List
        justify='center'
        classNames={{
          list: styles.list,
        }}>
        <Tabs.Tab value='recent'>Recent</Tabs.Tab>
        <Tabs.Tab value='popular'>Popular</Tabs.Tab>
        <Tabs.Tab value='history'>My History</Tabs.Tab>
      </Tabs.List>

      {isLoading ? (
        <Skeleton w='100%' h='22px' />
      ) : (
        <>
          <Tabs.Panel value='recent' w='100%'>
            <Group justify='center'>
              {recent.length > 0 ? (
                recent.map((item) => <LinkItem name={item.name} owner={item.owner} url={item.url} key={item.id} />)
              ) : (
                <Box c='gray' fz='sm'>
                  Empty...
                </Box>
              )}
            </Group>
          </Tabs.Panel>
          <Tabs.Panel value='popular' w='100%'>
            <Group justify='center'>
              {popular.length > 0 ? (
                popular.map((item) => (
                  <LinkItem
                    name={item.name}
                    owner={item.owner}
                    url={item.url}
                    label={`${item.search_count} searches`}
                    key={item.id}
                  />
                ))
              ) : (
                <Box c='gray' fz='sm'>
                  Empty...
                </Box>
              )}
            </Group>
          </Tabs.Panel>
          <Tabs.Panel value='history' w='100%'>
            <Group justify='center'>
              {history.length > 0 ? (
                history.map((item) => <LinkItem name={item.name} owner={item.owner} url={item.url} key={item.url} />)
              ) : (
                <Box c='gray' fz='sm'>
                  Empty...
                </Box>
              )}
            </Group>
          </Tabs.Panel>
        </>
      )}
    </Tabs>
  )
}
