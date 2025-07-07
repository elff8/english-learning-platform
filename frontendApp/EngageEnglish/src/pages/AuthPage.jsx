import React, { useState } from 'react';
import '../style/AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState(''); 
    const [message, setMessage] = useState('');

    const toggleMode = () => setIsLogin(!isLogin);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const url = isLogin ? 'http://localhost:5000/api/learning/login' : 'http://localhost:5000/api/learning/register';
        const payload = isLogin
      ? { email, password }
      : { email, password, fullName };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();

      if (!response.ok) {
        setMessage(text); 
        return;
      }

      if (isLogin) {
        navigate('/');
      } else {
        setMessage(text); 
      }

    } catch (err) {
      setMessage('Ошибка при связи с сервером.');
    }
  };
      
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Имя пользователя"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
          </form>
          {message && <div className="message">{message}</div>}
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p> 
            </div>
          )}
  
          {successMessage && (
            <div className="success-message">
              <p>{successMessage}</p> 
            </div>
          )}
  
          <p onClick={toggleMode} className="toggle-link">
            {isLogin
              ? 'Нет аккаунта? Зарегистрироваться'
              : 'Уже есть аккаунт? Войти'}
          </p>
        </div>
      </div>
    );
  };
  
  export default AuthPage;