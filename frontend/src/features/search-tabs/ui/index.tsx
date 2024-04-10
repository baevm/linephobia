import { Box, Group, Tabs } from '@mantine/core'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const popular = ['@facebook/react', '@moby/moby', '@swc-project/swc', '@angular/angular']
const recent = ['@vuejs/core', '@vuejs/router', '@swc-project/swc', '@reduxjs/redux']

export const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>('popular')

  return (
    <Tabs value={activeTab} onChange={setActiveTab} w='100%'>
      <Tabs.List
        justify='center'
        classNames={{
          list: styles.list,
        }}>
        <Tabs.Tab value='popular'>Popular</Tabs.Tab>
        <Tabs.Tab value='recent'>Recent</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='popular' w='100%'>
        <Group justify='center'>
          {popular.map((item) => (
            <Box component={Link} key={item} to='/' style={{ textDecoration: 'none' }}>
              {item}
            </Box>
          ))}
        </Group>
      </Tabs.Panel>
      <Tabs.Panel value='recent'>
        <Group justify='center'>
          {recent.map((item) => (
            <Box component={Link} key={item} to='/' style={{ textDecoration: 'none' }}>
              {item}
            </Box>
          ))}
        </Group>
      </Tabs.Panel>
    </Tabs>
  )
}
