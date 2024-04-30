import { SearchInput } from '@features/search-input'
import { ActionIcon, Box, Flex, useMantineColorScheme } from '@mantine/core'
import { TbMenu2, TbMoonStars, TbSun } from 'react-icons/tb'

type HeaderProps = {
  withSearch?: boolean
}

export const Header = ({ withSearch }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Flex w='100%' h='3.5rem' justify='space-between' align='center' px='sm'>
      <ActionIcon variant='transparent'>
        <TbMenu2 />
      </ActionIcon>
      <Box w='420px'>{withSearch && <SearchInput size='sm' />}</Box>
      <ActionIcon variant='transparent' onClick={toggleColorScheme}>
        {colorScheme === 'light' ? <TbMoonStars /> : <TbSun />}
      </ActionIcon>
    </Flex>
  )
}
