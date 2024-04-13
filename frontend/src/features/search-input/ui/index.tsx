import { ActionIcon, Box, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { TbSearch } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

export const SearchInput = () => {
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
        size='xl'
        placeholder='URL of git repository'
        rightSection={
          <ActionIcon variant='transparent' type='submit'>
            <TbSearch />
          </ActionIcon>
        }
      />
    </Box>
  )
}
