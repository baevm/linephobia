import { Box, Tooltip } from '@mantine/core'
import { Link } from 'react-router-dom'
import { formatName } from '../lib'

type LinkItemProps = {
  owner: string
  name: string
  url: string
  label?: string
}

export const LinkItem = ({ name, owner, url, label }: LinkItemProps) => {
  const title = formatName(owner, name)
  return (
    <Tooltip label={label} disabled={label === undefined} position='top'>
      <Box
        component={Link}
        title={`@${owner}/${name}`}
        fz='sm'
        c='indigo'
        to={`/repository?git_url=${url}`}
        style={{ textDecoration: 'none' }}>
        {title}
      </Box>
    </Tooltip>
  )
}
