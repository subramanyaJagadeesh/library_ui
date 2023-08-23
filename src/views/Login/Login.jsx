
import { useLogin } from './useLogin';
import { CONFIRM_PASSWORD, EMAIL, FNAME, INPUT_LABELS, LNAME, PASSWORD, PHONE, WELCOME_MESSAGE } from './Login.constants';

import './Login.scss';

export const Login = () => {
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
    {renderInputElem(EMAIL, email)}
    {renderInputElem(PASSWORD, password)}
    <h3 className="switch-user">
      Not a user? <a onClick={() => setNewUser(true)}>register</a>.
    </h3>
    </>
  )

  const renderInputElem = (elemName, elemValue) => (
    <div className="input-container">
      <label>{INPUT_LABELS?.[elemName]}</label>
      <input type="text" name={elemName} value={elemValue} onChange={handleChange} />
      {error?.[elemName]?.isError && (<span className="error">{error?.[elemName]?.message}</span>)}
    </div>
  )

  const renderSignupForm = () => (
    <>
    {renderInputElem(FNAME, firstName)}
    {renderInputElem(LNAME, lastName)}
    {renderInputElem(PHONE, phone)}
    {renderInputElem(EMAIL, email)}
    {renderInputElem(PASSWORD, password)}
    {renderInputElem(CONFIRM_PASSWORD, confirmPassword)}
    <h3 className="switch-user">
      <a onClick={() => setNewUser(false)}>Login</a>
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
      </form>
    </div>
  )
};