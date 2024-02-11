import { BaseSyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from '../../apis/user';
import { CONFIRM_PASSWORD, EMAIL, FNAME, LNAME, PASSWORD, PHONE } from './Login.constants';
import Cookies from "universal-cookie";
import { Error, ErrorDetail } from '../../types/error';
import { useAppDispatch } from '../../redux/hooks';
import { tokenAction } from '../../redux/reducers/User.reducer';

export const useLogin = () => {
  const initialError: ErrorDetail = {
    isError: false,
    message: '',
  }
  
  const [newUser, setNewUser] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const formText = newUser ? 'Signup' : 'Login';
  const [error, setError] = useState<Error>({});
  const cookies = new Cookies();
  

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const isError = Object.keys(error).every((key) => error[key]?.isError);
    if(isError)
      return;
    else
      newUser ? handleSignup() : handleLogin();
  };

  const handleLogin = () => {
    loginUser({email, password}).then(resp => {
      cookies.set('token', resp.data, { path: "/" });
      dispatch(tokenAction(resp?.data))
      navigate('/');
    }).catch(err => {
      setError({...error, main: {isError: true, message: err?.response?.data?.message}});
    })
  };

  const handleSignup = () => {
    signupUser({firstName, lastName, email, phone, password}).then(() => {
      setNewUser(1);
    })
  };

  const handleChange = (e: BaseSyntheticEvent) => {
    const { value, name } = e.target;
    switch(name){
      case EMAIL: handleEmailChange(value);
                break;
      case PASSWORD: handlePasswordChange(value) 
                break;
      case CONFIRM_PASSWORD: handleConfirmPasswordChange(value) 
                break;
      case FNAME: handleFirstNameChange(value);
                break;
      case LNAME: handleLastNameChange(value);
                break;
      case PHONE: handlePhoneChange(value);
                break;        
    }
  }

  const handleEmailChange = (value: string) => {
    if(!value.match(
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
    setError({...error, email: {isError: true, message: 'Invalid email'} });
    else if(error?.email?.isError)
      setError({...error, email:initialError});
    setEmail(value.trim());
  }

  const handlePasswordChange = (value: string) => {
    if(value.length < 8)
    setError({...error, password: {isError: true, message: 'Password cannot be less than 8 characters'}});
    else if(error?.password?.isError)
      setError({...error, password:initialError});
    setPassword(value);
  }

  const handleConfirmPasswordChange = (value: string) => {
    if(value !== password)
    setError({...error, changePassword: {isError: true, message: "Passwords don't match"}});
    else if(error?.changePassword?.isError)
      setError({...error, changePassword:initialError});
    setConfirmPassword(value);
  }

  const handleFirstNameChange = (value: string) => {
    if(value.length < 3)
    setError({...error, firstName: {isError: true, message: "First name cannot be less than 3 characters"}});
    else if(error?.firstName?.isError)
      setError({...error, firstName: initialError});
    setFirstName(value.trim());
  }

  const handleLastNameChange = (value: string) => {
    if(value.length < 3)
    setError({...error, lastName: {isError: true, message: "Last name cannot be less than 3 characters"}});
    else if(error?.lastName?.isError)
      setError({...error, lastName:initialError});
    setLastName(value.trim());
  }

  const handlePhoneChange = (value: string) => {
    if(Number.isNaN(value) || value.length < 10)
    setError({...error, phone: {isError: true, message: "Number is invalid"}});
    else if(error?.phone?.isError)
      setError({...error, phone:initialError});
    setPhone(value.trim());
  }

  return {
    error,
    setNewUser,
    firstName,
    lastName,
    phone, 
    email,
    password, 
    confirmPassword,
    onSubmit,
    handleChange,
    formText,
    newUser
  }

}