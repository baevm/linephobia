import '../styles/reset.css'
import '../styles/global.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '../router'

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
