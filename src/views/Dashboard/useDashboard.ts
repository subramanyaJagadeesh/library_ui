import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { getAllBooks } from "../../apis/books";
import { Book } from "../../types/book";
import { getBorrowingsByUser } from "../../apis/borrow";
import { useAppSelector } from "../../redux/hooks";

const useDashboard = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowings, setBorrowings] = useState<Book[]>([]);
  const { user } = useAppSelector((s) => s);

  useEffect(() => {
    if(user?.id) {
      getAllBooks().then(resp => setBooks(resp?.data));
      getBorrowingsByUser(user?.id).then(resp => setBorrowings(resp?.data));
    }
  }, [user])

  useEffect(() => {
    if(!cookies.get('token'))
      navigate('/login', {replace: true})
  }, []);

  const handleRentClick = (bookId: number) => {
    navigate('/rent/'+bookId);
  }
 
  return {
    books,
    borrowings,
    handleRentClick
  }
};

export default useDashboard;