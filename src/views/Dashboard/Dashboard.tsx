import React from 'react';

import './Dashboard.scss';
import useDashboard from './useDashboard';
import Book from './Book';

const Dashboard = () => {

  const {
    books,
    borrowings,
    handleRentClick,
  } = useDashboard();

  return (
    <div className="dashboard-wrapper">
      <div className="books-container">
        <h1>
          All Books
        </h1>
        <div className="books-wrapper">
          {
            books?.map(book => 
              <Book {...{book, handleRentClick}}/>
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
  )
}

export default Dashboard;