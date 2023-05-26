import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import CreateBookPage from './components/CreateBookPage';
import CreatedBooks from './components/CreatedBooks';

function App() {
  const [createdBooks, setCreatedBooks] = useState([]);

  const updateBookPhotos = (bookId, updatedPhotos) => {
    const updatedBooks = createdBooks.map((book) => {
      if (book.id === bookId) {
        return { ...book, photos: updatedPhotos };
      }
      return book;
    });
    setCreatedBooks(updatedBooks);
  };

  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1></h1>
          <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/create-book"
              element={<CreateBookPage setCreatedBooks={setCreatedBooks} updateBookPhotos={updateBookPhotos} />}
            />
            <Route
              path="/created-books"
              element={<CreatedBooks createdBooks={createdBooks} />}
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
