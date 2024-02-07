import React from "react";
import Card from "../../components/Card/Card";
import { Book as BookType } from "../../types/book";
import "./Book.scss";

const Book = ({ book, handleRentClick }: {book: BookType, handleRentClick: Function}) => (
  <Card>
    <div className="book">
      <img src={book?.img} />
      <div className="book-overlay">
        <div className="book-header">
          <h4>{book?.title}</h4>
        </div>
        <div className="book-details">
          {book.author+ ", "+ new Date(book.publishedDate).toString()}
        </div>
        <button className="button-secondary" onClick={() => handleRentClick(book?.id)}>Rent</button>
      </div>
    </div>
  </Card>
);

export default Book;