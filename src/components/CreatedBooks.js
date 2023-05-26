import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o componente Link para criar o botão de voltar
import './CreatedBooks.css';
import BookModal from './BookModal';

function CreatedBooks({ createdBooks }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setModalOpen(false);
  };

  return (
    <div className="created-books-page">
      <h1>Meus Books Criados</h1>
      <Link to="/create-book" className="back-button">Voltar</Link>
      <div className="book-card-container">
        {createdBooks.map((book, index) => (
          <div className="book-card" key={index} onClick={() => handleBookClick(book)}>
            <div className="book-preview">
              {book.photos.map((photo, photoIndex) => (
                <img
                  key={photoIndex}
                  src={photo}
                  alt={`Photo ${photoIndex}`}
                  className="photo-preview"
                />
              ))}
            </div>
            <div className="book-details">
              <h2 className="book-name">{book.bookName}</h2>
              <div className="description-date">
                <p className="book-description">{book.description}</p>
                <p className="book-date">{book.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <BookModal book={selectedBook} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default CreatedBooks;
