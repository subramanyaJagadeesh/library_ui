import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './views/Login/Login.jsx';
import './styles/index.scss'
import { Provider } from 'react-redux';
import  { store } from './redux/store.ts';
import Dashboard from './views/Dashboard/Dashboard.tsx';

const browserRouter = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Dashboard />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={browserRouter} />
    </Provider>
  </React.StrictMode>,
)
