import { HomePage } from '@pages/home'
import { RepositoryPage } from '@pages/repository'
import { RouteObject, createBrowserRouter } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '*',
    element: <div>404 not found</div>,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/repository',
    element: <RepositoryPage />,
  },
]

export const router = createBrowserRouter(routes)
