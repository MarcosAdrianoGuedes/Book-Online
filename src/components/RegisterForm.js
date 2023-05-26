import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../actions/userActions';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
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

  const handleRegister = () => {
    if (!validateEmail(email)) {
      setErrorMessage('Insira um e-mail válido.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        'A senha deve ter no mínimo 6 caracteres e conter letras e números.'
      );
      return;
    }

    const userData = {
      email,
      password,
    };

    dispatch(createUser(userData));
    setSuccessMessage('Usuário registrado com sucesso!');
    // Redirecionar para a página de login após o registro
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    return re.test(password);
  };

  const photos = [
    'https://upload.wikimedia.org/wikipedia/commons/8/8f/India_-_Delhi_smiling_girls_-_4698.jpg',
    'https://th.bing.com/th/id/OIP.Qoy1XwfL7TomAiahUS4kjQHaE8?pid=ImgDet&w=768&h=512&rs=1',
    'https://img.freepik.com/fotos-kostenlos/junge-vielfaeltige-leute-die-spass-haben-gemeinsam-im-freien-zu-lachen-konzentrieren-sie-sich-auf-das-gesicht-des-schwulen-mannes_166273-1831.jpg?size=626&ext=jpg',
  ];

  return (
    <div className="register-form-container">
      <div className="form-content">
        <h2>Registro</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <label>
          E-mail:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button onClick={handleRegister}>Registrar</button>
        <button onClick={handleLogin}>Faça login</button>
      </div>
      <div className="photo-container">
        <h2>Suas lembranças, nossa memória!</h2>
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            className={index === activePhotoIndex ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
}

export default RegisterForm;
