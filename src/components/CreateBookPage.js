import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBookPage.css';
import BookModal from './BookModal';

function CreateBookPage({ setCreatedBooks, updateBookPhotos }) {
  const [showForm, setShowForm] = useState(false);
  const [bookName, setBookName] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [welcomeText, setWelcomeText] = useState(
    'Seja bem-vindo(a), vamos registrar uma nova história?'
  );

  const navigate = useNavigate();

  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const photosArray = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        photosArray.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });

    setPhotos(photosArray);
    updateBookPhotos(photosArray); // Atualiza as fotos no componente pai
  };

  const handleSaveBook = () => {
    if (bookName === '') {
      setErrorMessage('Por favor, insira um nome para o book.');
      return;
    }

    // Salvar as informações do livro no estado createdBooks
    const newBook = {
      bookName,
      description,
      photos,
      date,
    };

    setCreatedBooks((prevBooks) => [...prevBooks, newBook]);

    // Reiniciar os campos após salvar o book
    setBookName('');
    setDescription('');
    setPhotos([]);
    setDate('');
    setErrorMessage('');

    // Navegar para a página CreatedBooks
    navigate('/created-books');
  };

  const handleCreateNewBook = () => {
    setShowForm(true);
    setWelcomeText('Preencha os campos para que possamos registrar sua história!');
  };

  const handleViewMyBooks = () => {
    // Navegar para a página de visualização de "Meus Books"
    navigate('/created-books');
  };

  const handleCancel = () => {
    setShowForm(false);
    setWelcomeText('Seja bem-vindo(a), vamos criar um novo book de fotos?');
  };

  const handleDeletePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    updateBookPhotos(updatedPhotos); // Atualiza as fotos no componente pai
  };

  return (
    <div className="create-book-page">
      <div className="welcome-container">
  <div className="text-container">
    <h2>{welcomeText}</h2>
  </div>
  {!showForm && (
    <div className="create-book-container">
      <div className="button-container">
        <p>Crie um novo book ou acesse seus books já criados:</p>
        <button onClick={handleCreateNewBook}>Criar novo book</button>
        <button onClick={handleViewMyBooks}>Meus Books</button>
      </div>
    </div>
  )}
</div>

      {showForm && (
        <div className="form-container">
          <label>
            Nome do book:
            <input
              type="text"
              value={bookName}
              onChange={handleBookNameChange}
            />
          </label>
          <label>
            Descrição:
            <textarea
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </label>
          <label>
            Data de registro:
            <input type="date" value={date} onChange={handleDateChange} />
          </label>
          <label>
            Adicionar fotos:
            <label htmlFor="file-input" className="file-input-label">
              Escolher arquivos
              <input
                id="file-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
              />
            </label>
          </label>
          <button onClick={handleSaveBook}>Salvar</button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}
      <div className="photo-preview">
        {photos.map((photo, index) => (
          <div className="preview-container" key={index}>
            <img src={photo} alt={`Photo ${index}`} />
            <div
              className="photo-options"
              onClick={() => handleDeletePhoto(index)}
            >
              <span className="photo-option delete">X</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateBookPage;
