import { Box, BoxComponentProps, Flex, PolymorphicComponentProps } from '@mantine/core'
import { Header } from '@widgets/header'

type Props<C = 'div'> = PolymorphicComponentProps<C, BoxComponentProps> & {
  children: React.ReactNode
  align?: string
  withSearch?: boolean
}

export const PageLayout = ({ children, withSearch, align = 'center', ...contentProps }: Props) => {
  return (
    <Box h='100%' w='100%'>
      <Header withSearch={withSearch} />
      <Flex align={align} justify='center' h='calc(100% - 3.5rem)' w='100%' {...contentProps}>
        {children}
      </Flex>
    </Box>
  )
}
