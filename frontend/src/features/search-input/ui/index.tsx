import { useLazySearchReposQuery } from '@entities/repository/api'
import { ActionIcon, Autocomplete, Box, Loader, MantineSize } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import React, { useState } from 'react'
import { TbSearch } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

type SearchInputProps = {
  size: MantineSize
}

const iconSizes: Record<MantineSize, string> = {
  xs: '16px',
  sm: '16px',
  lg: '16px',
  md: '16px',
  xl: '24px',
}

export const SearchInput = ({ size }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [triggerSearch, { data, error, isLoading }] = useLazySearchReposQuery()
  const debouncedSearch = useDebouncedCallback(async (query: string) => {
    try {
      await triggerSearch(query).unwrap()
      setIsDropdownOpen(true)
    } catch (error) {
      console.log({ error })
    }
  }, 1000)

  const navigate = useNavigate()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate({ pathname: '/repository', search: `?git_url=${searchQuery}` })
  }

  const handleChange = (val: string) => {
    setSearchQuery(val)
    debouncedSearch(val)
  }

  console.log({ data, isDropdownOpen })

  const searchResultLinks = data?.items.map((item) => item.html_url)

  return (
    <Box component='form' w='100%' onSubmit={onSubmit}>
      <Autocomplete
        value={searchQuery}
        data={searchResultLinks}
        dropdownOpened={isDropdownOpen}
        onChange={handleChange}
        onDropdownOpen={() => setIsDropdownOpen(true)}
        onDropdownClose={() => setIsDropdownOpen(false)}
        type='url'
        w='100%'
        size={size}
        placeholder='URL of git repository'
        rightSection={
          isLoading ? (
            <Loader size={iconSizes[size]} />
          ) : (
            <ActionIcon variant='transparent' type='submit'>
              <TbSearch size={iconSizes[size]} />
            </ActionIcon>
          )
        }
      />
    </Box>
  )
}
