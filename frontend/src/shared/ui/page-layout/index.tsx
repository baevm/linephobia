import { Box, Flex } from '@mantine/core'
import { Header } from '@widgets/header'

type Props = {
  children: React.ReactNode
}

export const PageLayout = ({ children }: Props) => {
  return (
    <Box h='100%' w='100%'>
      <Header />
      <Flex align='center' justify='center' h='calc(100% - 3.5rem)' w='100%'>
        {children}
      </Flex>
    </Box>
  )
}
