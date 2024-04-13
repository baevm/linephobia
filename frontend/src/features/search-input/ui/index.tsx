import { ActionIcon, Box, MantineSize, TextInput } from '@mantine/core'
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
  const navigate = useNavigate()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate({ pathname: '/repository', search: `?git_url=${searchQuery}` })
  }

  return (
    <Box component='form' w='100%' onSubmit={onSubmit}>
      <TextInput
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        type='text'
        w='100%'
        size={size}
        placeholder='URL of git repository'
        rightSection={
          <ActionIcon variant='transparent' type='submit'>
            <TbSearch size={iconSizes[size]} />
          </ActionIcon>
        }
      />
    </Box>
  )
}
