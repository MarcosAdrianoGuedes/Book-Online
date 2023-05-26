import React, { useState } from 'react';
import './BookModal.css';

function BookModal({ book, onClose, updateBookPhotos }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  const handleDownloadPhoto = (photo) => {
    // Lógica para download da foto
    const link = document.createElement('a');
    link.href = photo;
    link.download = `photo-${Date.now()}`;
    link.click();
  };

  const handleDeletePhoto = () => {
    if (selectedPhotoIndex !== null) {
      setConfirmDelete(true);
    }
  };

  const handleNewPhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setNewPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const confirmDeletePhoto = () => {
    if (selectedPhotoIndex !== null) {
      const updatedPhotos = [...book.photos];
      updatedPhotos.splice(selectedPhotoIndex, 1);

      // Atualize o estado do book com as fotos atualizadas
      updateBookPhotos(updatedPhotos);

      setConfirmDelete(false);
      setSelectedPhotoIndex(null);
    }
  };

  const handleAddNewPhoto = () => {
    if (newPhoto) {
      const updatedPhotos = [...book.photos, newPhoto];

      // Atualize o estado do book com as fotos atualizadas
      updateBookPhotos(updatedPhotos);

      setNewPhoto(null);
    }
  };

  return (
    <div className="book-modal">
      <div className="book-modal-content">
        <h2 className="book-name">{book.name}</h2>
        <div className="book-photos">
          {book.photos.map((photo, index) => (
            <div
              key={index}
              className="book-photo"
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <img src={photo} alt={`Photo ${index}`} className="photo-preview" />
              {selectedPhotoIndex === index && (
                <div className="photo-options">
                  <button
                    className="photo-option download"
                    onClick={() => handleDownloadPhoto(photo)}
                  >
                    Download
                  </button>
                  <button className="photo-option delete" onClick={handleDeletePhoto}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="add-photo-button">
            <input type="file" accept="image/*" onChange={handleNewPhotoUpload} />
            <button onClick={handleAddNewPhoto}>Nova foto</button>
          </div>
        </div>
        {confirmDelete && (
          <div className="delete-confirm">
            <p>Deseja mesmo excluir essa foto?</p>
            <div className="confirm-buttons">
              <button onClick={confirmDeletePhoto}>Sim</button>
              <button onClick={() => setConfirmDelete(false)}>Não</button>
            </div>
          </div>
        )}
        <button className="close-button custom-close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default BookModal;
