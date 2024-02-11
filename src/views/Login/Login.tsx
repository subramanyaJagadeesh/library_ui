
import React from 'react';
import { useLogin } from './useLogin';
import { CONFIRM_PASSWORD, EMAIL, FNAME, INPUT_LABELS, LNAME, PASSWORD, PHONE, WELCOME_MESSAGE } from './Login.constants';

import './Login.scss';

const Login = () => {
  const {
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
    newUser,
  } = useLogin();

  const renderLoginForm = () => (
    <>
    {renderInputElem(EMAIL, email, EMAIL)}
    {renderInputElem(PASSWORD, password, PASSWORD)}
    <h3 className="switch-user">
      Not a user? <a onClick={() => setNewUser(0)}>register</a>.
    </h3>
    </>
  )

  const renderInputElem = (elemName: string, elemValue: string, elemType: string) => (
    <div className="input-container">
      <label>{INPUT_LABELS?.[elemName]}</label>
      <input type={elemType} name={elemName} value={elemValue} onChange={handleChange} />
      {error?.[elemName]?.isError && (<span className="error">{error?.[elemName]?.message}</span>)}
    </div>
  )

  const renderSignupForm = () => (
    <>
    {renderInputElem(FNAME, firstName, "text")}
    {renderInputElem(LNAME, lastName, "text")}
    {renderInputElem(PHONE, phone, "text")}
    {renderInputElem(EMAIL, email, "email")}
    {renderInputElem(PASSWORD, password, "password")}
    {renderInputElem(CONFIRM_PASSWORD, confirmPassword, "password")}
    <h3 className="switch-user">
      <a onClick={() => setNewUser(0)}>Have an account? Login</a>
    </h3>
    </>
  )

  return (
    <div className="login-wrapper">
      <h1 className="header">
        {WELCOME_MESSAGE}
      </h1>
      <form className="form" onSubmit={onSubmit}>
        <h1 className="header">
          {formText}
        </h1>
        {
          newUser ? renderSignupForm() : renderLoginForm() 
        }
        <button type="submit">{formText}</button>
        {error?.main?.isError && (<span className="error">{error?.main?.message}</span>)}
      </form>
    </div>
  )
};

export default Login;