import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/Card/Card";

import './Dashboard.scss';
import useDashboard from './useDashboard';

const Dashboard = () => {

  const {
    books,
    borrowings,
    handleRentClick,
  } = useDashboard();

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="info-container">
        <div className="books-container">
          <h1>
            All Books
          </h1>
          <div className="books-wrapper">
            {
              books?.map(book => 
                <Card 
                  header={book?.title} 
                  src={book?.img} 
                  body={book.author+ ", "+ new Date(book.publishedDate).toString()} 
                  footer={<button className="button-secondary" onClick={() => handleRentClick(book?.id)}>Rent</button>} >
                </Card>
              )
            }
          </div>
        </div>
        <div className="borrow-container">
          <h1>
            All Borrowings
          </h1>
          {
            borrowings?.map(book => (
              <div className="book">
                <h3>
                  {book?.title}
                </h3>
                <img src="" />
                <h3>
                  {book.author}
                </h3>
                <h3>
                  {new Date(book.publishedDate).toString()}
                </h3>
              </div>
            ))
          }
         
        </div>
      </div>
    </div>
  )
}

export default Dashboard;