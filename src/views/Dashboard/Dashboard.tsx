import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Navbar from "../../components/Navbar";
import './Dashboard.scss';
import { getAllBooks } from "../../apis/books";
import { Book } from "../../types/book";

const Dashboard = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getAllBooks().then(resp => setBooks(resp?.data));
  }, [])

  useEffect(() => {
    if(!cookies.get('token'))
      navigate('/login', {replace: true})
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <h1>
        Welcome to the public library!
      </h1>
      <div className="books-container">
        
      </div>
    </div>
  )
}

export default Dashboard;