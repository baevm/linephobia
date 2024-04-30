import { Box, BoxComponentProps, PolymorphicComponentProps } from '@mantine/core'
import { Header } from '@widgets/header'
import { useEffect } from 'react'

type Props<C = 'div'> = PolymorphicComponentProps<C, BoxComponentProps> & {
  children: React.ReactNode
  withSearch?: boolean
  title?: string
}

export const PageLayout = ({ children, withSearch, title }: Props) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | LINEPHOBIA`
    }
  }, [title])

  return (
    <Box h='100%' w='100%' bg='var(--mantine-color-body)'>
      <Header withSearch={withSearch} />
      {children}
    </Box>
  )
}
