import { Box, Group, Tabs, Text } from '@mantine/core'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { getSearchHistory } from '@features/search-input'
import { getRepoFullname } from '@shared/lib/git'

// TODO: popular & recent tabs
const popular = ['@facebook/react', '@moby/moby', '@swc-project/swc', '@angular/angular']
const recent = ['@facebook/react', '@moby/moby', '@swc-project/swc', '@angular/angular']

export const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>('recent')
  const history = useMemo(() => {
    return getSearchHistory()
      .map((item) => {
        const { owner, repoName } = getRepoFullname(item.html_url)
        return { fullname: `@${owner}/${repoName}`, html_url: item.html_url }
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
        <Tabs.Tab value='history'>History</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='recent' w='100%'>
        <Group justify='center'>
          {recent.map((item) => (
            <Box component={Link} key={item} to='/' style={{ textDecoration: 'none' }}>
              {item}
            </Box>
          ))}
        </Group>
      </Tabs.Panel>
      <Tabs.Panel value='popular' w='100%'>
        <Group justify='center'>
          {popular.map((item) => (
            <Box component={Link} key={item} to='/' style={{ textDecoration: 'none' }}>
              {item}
            </Box>
          ))}
        </Group>
      </Tabs.Panel>
      <Tabs.Panel value='history'>
        <Group justify='center'>
          {history.length > 0 ? (
            history.map((item) => (
              <Box
                component={Link}
                key={item.html_url}
                to={`/repository?git_url=${item.html_url}`}
                style={{ textDecoration: 'none' }}>
                {item.fullname}
              </Box>
            ))
          ) : (
            <Text c='gray'>Empty...</Text>
          )}
        </Group>
      </Tabs.Panel>
    </Tabs>
  )
}
