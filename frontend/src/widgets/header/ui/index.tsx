import { SearchInput } from '@features/search-input'
import { ActionIcon, Box, Flex } from '@mantine/core'
import { TbMenu2, TbMoonStars } from 'react-icons/tb'

type HeaderProps = {
  withSearch?: boolean
}

export const Header = ({ withSearch }: HeaderProps) => {
  return (
    <Flex w='100%' h='3.5rem' justify='space-between' align='center' px='sm'>
      <ActionIcon variant='transparent'>
        <TbMenu2 />
      </ActionIcon>
      <Box w='420px'>{withSearch && <SearchInput size='sm' />}</Box>
      <ActionIcon variant='transparent'>
        <TbMoonStars />
      </ActionIcon>
    </Flex>
  )
}
