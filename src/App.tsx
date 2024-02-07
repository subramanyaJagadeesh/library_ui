import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import { Cookie } from './utils/cookies.js';
import './styles/index.scss'
import { useAppDispatch } from './redux/hooks';
import { getUser } from './apis/user';
import { loginUserAction } from './redux/reducers/User.reducer';
import { AxiosResponse } from 'axios';

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

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(Cookie.getCookies('token')){
      getUser().then((resp: AxiosResponse) => {dispatch(loginUserAction(resp?.data))});
    }
  }, []);

  return(
    <RouterProvider router={browserRouter} />
  )
};

export default App;