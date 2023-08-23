import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';import { loginUser, signupUser } from '../../apis/user';
import { loginUserAction }  from '../../redux/reducers/User.reducer';
import { CONFIRM_PASSWORD, EMAIL, FNAME, LNAME, PASSWORD, PHONE } from './Login.constants';

export const useLogin = () => {
  const [newUser, setNewUser] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const formText = newUser ? 'Signup' : 'Login';
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(error)?.forEach(({isError}) => {
      if(isError)
        return;
      else
        newUser ? handleSignup() : handleLogin();
    }));
  };

  const handleLogin = () => {
    loginUser({email, password}).then(resp => {
      dispatch(loginUserAction(resp));
      navigate('/');
    })
  };

  const handleSignup = () => {
    signupUser({firstName, lastName, email, phone, password}).then(() => {
      navigate('/login');
    })
  };

  const handleChange = (e) => {
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

  const handleEmailChange = (value) => {
    if(!value.match(
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
    setError({...error, email: {isError: true, message: 'Invalid email'} });
    else if(error?.email?.isError)
      setError({...error, email:{}});
    setEmail(value.trim());
  }

  const handlePasswordChange = (value) => {
    if(value.length < 8)
    setError({...error, password: {isError: true, message: 'Password cannot be less than 8 characters'}});
    else if(error?.password?.isError)
      setError({...error, password:{}});
    setPassword(value);
  }

  const handleConfirmPasswordChange = (value) => {
    if(value !== password)
    setError({...error, changePassword: {isError: true, message: "Passwords don't match"}});
    else if(error?.changePassword?.isError)
      setError({...error, changePassword:{}});
    setConfirmPassword(value);
  }

  const handleFirstNameChange = (value) => {
    if(value.length < 3)
    setError({...error, firstName: {isError: true, message: "First name cannot be less than 3 characters"}});
    else if(error?.firstName?.isError)
      setError({...error, firstName:{}});
    setFirstName(value.trim());
  }

  const handleLastNameChange = (value) => {
    if(value.length < 3)
    setError({...error, lastName: {isError: true, message: "Last name cannot be less than 3 characters"}});
    else if(error?.lastName?.isError)
      setError({...error, lastName:{}});
    setLastName(value.trim());
  }

  const handlePhoneChange = (value) => {
    if(Number.isNaN(value) || value.length < 10)
    setError({...error, phone: {isError: true, message: "Number is invalid"}});
    else if(error?.phone?.isError)
      setError({...error, phone:{}});
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