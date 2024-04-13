import { Box, Flex } from '@mantine/core'
import { Header } from '@widgets/header'

type Props = {
  children: React.ReactNode
  align?: string
}

export const PageLayout = ({ children, align = 'center' }: Props) => {
  return (
    <Box h='100%' w='100%'>
      <Header />
      <Flex align={align} justify='center' h='calc(100% - 3.5rem)' w='100%'>
        {children}
      </Flex>
    </Box>
  )
}
