import { Box, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { TbSearch } from 'react-icons/tb'

export const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(e)
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
        rightSection={<TbSearch />}
      />
    </Box>
  )
}
