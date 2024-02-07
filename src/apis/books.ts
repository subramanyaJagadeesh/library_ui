import backend from '.';

export const getAllBooks = () =>
  backend.get('/book/all');