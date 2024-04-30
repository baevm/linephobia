import { store } from '@app/store'
import '@mantine/charts/styles.css'
import { Input, MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import { IconContext } from 'react-icons'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from '../router'
import '../styles/global.css'
import styles from '../styles/override.module.css'

const theme = createTheme({
  fontFamily: 'Manrope, sans-serif',
  components: {
    Input: Input.extend({ classNames: styles }),
  },
})

export function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <IconContext.Provider value={{ size: '1.5em', color: 'var(--mantine-color-dimmed)' }}>
          <RouterProvider router={router} />
        </IconContext.Provider>
      </MantineProvider>
    </Provider>
  )
}
