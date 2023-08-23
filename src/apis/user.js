import axios from "axios";

export const loginUser = ({email, password}) =>
  axios.post('/login', {email, password});

export const signupUser = ({firstName, lastName, email, phone, password}) =>
  axios.post('/create', {first_name: firstName, last_name:lastName, email, phone, password});