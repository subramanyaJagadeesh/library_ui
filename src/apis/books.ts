import backend from '.';

export const getAllBooks = () =>
  backend.get('/books/all');