import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter, Router, RouterProvider, createBrowserRouter } from 'react-router-dom';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    }
    ,
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/home',
      element:<Home/>
    }
  ])
  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  )
}
