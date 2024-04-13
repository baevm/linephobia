import { Anchor, Badge, Box, Group, Stack, Text, Title } from '@mantine/core'
import { TbEye, TbGitFork, TbLink, TbStar } from 'react-icons/tb'

export const RepositoryAbout = () => {
  return (
    <Stack maw='450px'>
      <Group align='center'>
        <Title order={3}>facebook / react</Title>
        <Badge color='gray' variant='light'>
          100 MB
        </Badge>
      </Group>
      <Group>
        <Badge color='gray' radius='sm' variant='outline'>
          <Group align='center'>
            <TbEye />
            <Box>3000</Box>
          </Group>
        </Badge>
        <Badge color='gray' radius='sm' variant='outline'>
          <Group align='center'>
            <TbGitFork />
            <Box>3000</Box>
          </Group>
        </Badge>
        <Badge color='gray' radius='sm' variant='outline'>
          <Group align='center'>
            <TbStar />
            <Box>3000</Box>
          </Group>
        </Badge>
      </Group>
      <Stack mt='lg' gap='xs'>
        <Title order={4}>About</Title>
        <Text>The library for web and native user interfaces.</Text>
        <Group gap='5px'>
          <TbLink size='20px' />
          <Anchor href='https://react.dev' target='_blank'>
            react.dev
          </Anchor>
        </Group>
      </Stack>
      <Group gap='xs'>
        <Badge>react</Badge>
        <Badge>javascript</Badge>
        <Badge>library</Badge>
        <Badge>ui</Badge>
        <Badge>frontend</Badge>
        <Badge>declarative</Badge>
      </Group>
    </Stack>
  )
}
