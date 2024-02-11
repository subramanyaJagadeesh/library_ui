import React, { useEffect, ReactNode } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import './styles/index.scss'
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getUser } from './apis/user';
import { loginUserAction } from './redux/reducers/User.reducer';
import { AxiosResponse } from 'axios';
import Navbar from './components/Navbar/Navbar';

const wrapNavbar = (body: ReactNode) => (
  <>
  <Navbar />
  {body}
  </>
);

const browserRouter = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: wrapNavbar(<Dashboard />)
  }
]);

const App = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(s => s?.user);

  useEffect(() => {
    if(token){
      getUser().then((resp: AxiosResponse) => {dispatch(loginUserAction(resp?.data))});
    }
  }, [token]);

  return(
    <RouterProvider router={browserRouter} />
  )
};

export default App;