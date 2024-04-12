import { ActionIcon, Box, Flex } from '@mantine/core'
import { TbMenu2, TbMoonStars } from 'react-icons/tb'

export const Header = () => {
  return (
    <Flex w='100%' h='3.5rem' justify='space-between' align='center' p='sm'>
      <Box>
        <ActionIcon variant='transparent'>
          <TbMenu2 />
        </ActionIcon>
      </Box>
      <Box>
        <ActionIcon variant='transparent'>
          <TbMoonStars />
        </ActionIcon>
      </Box>
    </Flex>
  )
}
