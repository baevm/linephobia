import { RouteObject, createBrowserRouter } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>root page</div>,
  },
]

export const router = createBrowserRouter(routes)
