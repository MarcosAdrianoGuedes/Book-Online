import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/userActions.js';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    // Função para atualizar o índice da foto ativa a cada 3 segundos
    const interval = setInterval(() => {
      setActivePhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleLogin = () => {
    const userData = {
      username,
      password,
    };

    dispatch(loginUser(userData));
    navigate('/create-book');
  };

  const photos = [
    {
      id: 1,
      src: 'https://news.yale.edu/sites/default/files/styles/featured_media/public/mother-and-baby.jpeg?itok=1KnwyZ4z&c=07307e7d6a991172b9f808eb83b18804',
      alt: 'Photo 1',
      caption: 'Registre suas memórias!',
    },
    {
      id: 2,
      src: 'https://d.newsweek.com/en/full/1611005/party.jpg',
      alt: 'Photo 2',
      caption: 'O momento foi feito para ser vivido!',
    },
    {
      id: 3,
      src: 'https://lp-cms-production.imgix.net/2020-10/AlamyRF_JW90D6.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=35&dpr=3',
      alt: 'Photo 3',
      caption: 'E nós fomos feitos para salva-los.',
    },
  ];

  return (
    <div className="login-form-container">
      <div className="form-content">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <label>
          Usuário:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleLogin}>Entrar</button>
      </div>
      <div className="photo-container">
        <img
          src={photos[activePhotoIndex].src}
          alt={photos[activePhotoIndex].alt}
          className="active"
        />
        <h2>{photos[activePhotoIndex].caption}</h2>
      </div>
    </div>
  );
}

export default LoginForm;
