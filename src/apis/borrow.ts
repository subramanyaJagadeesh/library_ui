import backend from '.';

export const getBorrowingsByUser = (userId: number) =>
  backend.get('/borrow/user/'+userId);