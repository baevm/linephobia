import { useLazySearchReposQuery } from '@entities/repository/api'
import {
  ActionIcon,
  Box,
  Combobox,
  Group,
  Loader,
  MantineSize,
  ScrollArea,
  Text,
  TextInput,
  useCombobox,
} from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import React, { useMemo, useState } from 'react'
import { IoLogoGithub } from 'react-icons/io5'
import { TbSearch } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { GitSiteSwitcher } from './gitSiteSwitcher'

type SearchInputProps = {
  size: MantineSize
}

const iconSizes: Record<MantineSize, string> = {
  xs: '16px',
  sm: '18px',
  lg: '20px',
  md: '22px',
  xl: '24px',
}

export const SearchInput = ({ size }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const combobox = useCombobox()
  const navigate = useNavigate()

  const [triggerSearch, { data, error, isFetching }] = useLazySearchReposQuery()
  const debouncedSearch = useDebouncedCallback(async (query: string) => {
    if (query.length < 2) return

    try {
      await triggerSearch(query, true).unwrap()
    } catch (error) {
      console.log({ error })
    }
  }, 1000)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate({ pathname: '/repository', search: `?git_url=${searchQuery}` })
  }

  const handleChange = (val: string) => {
    setSearchQuery(val)

    if (!val) {
      return
    }

    // search only if not URL is entered
    const isSearchByURL = URL.canParse(val)

    if (!isSearchByURL) {
      debouncedSearch(val)
    }
  }

  const onOptionSubmit = (value: string) => {
    navigate({ pathname: '/repository', search: `?git_url=${value}` })
  }

  const options = useMemo(() => {
    if (searchQuery.length === 0) return []

    return (
      data?.items.map((item) => (
        <Combobox.Option value={item.html_url} key={item.html_url}>
          <Group gap='10px'>
            <IoLogoGithub size={iconSizes[size]} />
            <Text size={size}>@{item.full_name}</Text>
          </Group>
        </Combobox.Option>
      )) ?? []
    )
  }, [data, searchQuery])

  return (
    <Box component='form' w='100%' onSubmit={onSubmit}>
      <Combobox onOptionSubmit={onOptionSubmit} store={combobox} withinPortal={false}>
        <Combobox.Target>
          <TextInput
            value={searchQuery}
            onChange={(e) => handleChange(e.target.value)}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            type='text'
            w='100%'
            size={size}
            placeholder='Search by name or enter URL of git repository'
            leftSection={<GitSiteSwitcher iconSize={iconSizes[size]} />}
            leftSectionWidth='40px'
            rightSection={
              isFetching ? (
                <Loader size={iconSizes[size]} />
              ) : (
                <ActionIcon variant='transparent' type='submit'>
                  <TbSearch size={iconSizes[size]} />
                </ActionIcon>
              )
            }
          />
        </Combobox.Target>

        <Combobox.Dropdown hidden={options.length === 0}>
          <ScrollArea.Autosize mah={250} type='scroll'>
            <Combobox.Options>{options.length > 0 && options}</Combobox.Options>
          </ScrollArea.Autosize>
        </Combobox.Dropdown>
      </Combobox>
    </Box>
  )
}
