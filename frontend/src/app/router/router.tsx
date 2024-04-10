import { HomePage } from '@pages/home'
import { RouteObject, createBrowserRouter } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
]

export const router = createBrowserRouter(routes)
