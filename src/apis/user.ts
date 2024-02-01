import backend from ".";

type LoginCredentials = {
  email: string,
  password: string
}

type SignupValues = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
}

export const loginUser = ({email, password}: LoginCredentials) =>
  backend.post('/auth/login', {email, password});

export const signupUser = ({firstName, lastName, email, phone, password}: SignupValues) =>
  backend.post('/auth/signup', {firstName, lastName, email, phone, password});