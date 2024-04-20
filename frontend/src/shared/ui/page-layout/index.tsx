import { Box, BoxComponentProps, Flex, PolymorphicComponentProps } from '@mantine/core'
import { Header } from '@widgets/header'
import { useEffect } from 'react'

type Props<C = 'div'> = PolymorphicComponentProps<C, BoxComponentProps> & {
  children: React.ReactNode
  align?: string
  withSearch?: boolean
  title?: string
}

export const PageLayout = ({ children, withSearch, align = 'center', title, ...contentProps }: Props) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | LINEPHOBIA`
    }
  }, [title])

  return (
    <Box h='100%' w='100%'>
      <Header withSearch={withSearch} />
      <Flex align={align} justify='center' h='calc(100% - 3.5rem)' w='100%' {...contentProps}>
        {children}
      </Flex>
    </Box>
  )
}
