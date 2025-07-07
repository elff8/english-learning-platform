import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import '../style/Home.css';

function Home() {
  const quotes = [
    "Каждое новое слово — это шаг ближе к вашей цели!",
    "Не откладывай на завтра то, что можно выучить сегодня.",
    "Изучение языка — это инвестиция в будущее."
  ];
  

  const [currentQuote, setCurrentQuote] = useState('');
  const navigate = useNavigate();  

  useEffect(() => {
    const lastQuoteIndex = localStorage.getItem('lastQuoteIndex') || 0;
    const nextIndex = (parseInt(lastQuoteIndex) + 1) % quotes.length;
    setCurrentQuote(quotes[nextIndex]);
    localStorage.setItem('lastQuoteIndex', nextIndex);
  }, []);

  const handleStart = () => {
    navigate('/FlashCards/');  
  };

  return (
    <div className="vertical-home">
      <header className="vertical-header">
        <h1>Добро пожаловать на платформу изучения английского!</h1>
        <p className="header-subtitle">Учим легко, интересно и эффективно</p>
      </header>

      <main className="vertical-content">
        <section className="quote-section">
          <blockquote>"{currentQuote}"</blockquote>
        </section>

        <button className="vertical-button" onClick={handleStart}>
          Начать обучение
        </button>

        <section className="stats-section">
          <h2>Что вы получите</h2>
          <ul>
            <li>Базовые знания английского языка</li>
            <li>Практику на разных уровнях сложности</li>
            <li>Возможность следить за своим прогрессом</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Home;
