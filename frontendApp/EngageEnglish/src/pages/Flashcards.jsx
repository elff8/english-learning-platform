import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Flashcards.css';

const Flashcards = () => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lockedCardIds, setLockedCardIds] = useState(new Set()); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/learning/Flashcards')
      .then(response => {
        setCards(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading flashcards', error);
        setError('Не удалось загрузить карточки. Пожалуйста, попробуйте позже.');
        setLoading(false);
      });
  }, []);

  const isInputLocked = lockedCardIds.has(cards[currentCardIndex]?.id);

  const lockInput = () => {
    if (!cards[currentCardIndex]?.id) return;
    setLockedCardIds(prev => new Set(prev).add(cards[currentCardIndex].id));
  };

  const checkAnswer = () => {
    const currentCard = cards[currentCardIndex];
    const isCorrect = userInput.trim().toLowerCase() === currentCard.translation.toLowerCase();
    setMessage(isCorrect ? 'Правильно! Ты умничка' : 'Неправильно:с ');
    setShowTranslation(true);
    lockInput();
  };

  const markAsKnown = () => {
    const updatedCards = cards.filter((_, index) => index !== currentCardIndex);
    setCards(updatedCards);
    setCurrentCardIndex((prevIndex) => (prevIndex >= updatedCards.length ? 0 : prevIndex));
    setUserInput('');
    setMessage('');
    setShowTranslation(false);
  };

  const handleShowTranslation = () => {
    setShowTranslation(!showTranslation);
    if (!showTranslation) {
      lockInput(); 
    }
    setUserInput('');
    setMessage('');
  };

  const navigateCard = (direction) => {
    setCurrentCardIndex((prevIndex) => {
      if (direction === 'prev') {
        return prevIndex === 0 ? cards.length - 1 : prevIndex - 1;
      } else {
        return (prevIndex + 1) % cards.length;
      }
    });
    setUserInput('');
    setMessage('');
    setShowTranslation(false);
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!cards.length) return <div>Нет доступных карточек.</div>;

  const currentCard = cards[currentCardIndex];

  return (
    <div className="flashcard-container">
      <div className="flashcard-wrapper">
        <button
          className="nav-button nav-button-left"
          onClick={() => navigateCard('prev')}
          disabled={cards.length <= 1}
          title={cards.length <= 1 ? 'Доступно только для нескольких карточек' : ''}
        >
          &#8592;
        </button>

        <div className="flashcard">
          <div className="flashcard-word">{currentCard.englishWord}</div>
          {currentCard.transcription && (
            <div className="flashcard-transcription">/{currentCard.transcription}/</div>
          )}
          {showTranslation && (
            <div className="flashcard-translation">
              Перевод: {currentCard.translation}
            </div>
          )}
        </div>

        <button
          className="nav-button nav-button-right"
          onClick={() => navigateCard('next')}
          disabled={cards.length <= 1}
          title={cards.length <= 1 ? 'Доступно только для нескольких карточек' : ''}
        >
          &#8594;
        </button>
      </div>

      <div className="flashcard-actions">
        <input
          type="text"
          className="flashcard-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isInputLocked} 
        />

        <div className="flashcard-buttons">
          <button
            className="btn-check"
            onClick={checkAnswer}
            disabled={!userInput.trim() || isInputLocked}
          >
            Проверить перевод
          </button>
          <button
            className="btn-known"
            onClick={markAsKnown}
          >
            Я знаю это слово
          </button>
          <button
            className="btn-show-translation"
            onClick={handleShowTranslation}
          >
            {showTranslation ? 'Скрыть перевод' : 'Показать перевод'}
          </button>
        </div>

        <div className="message">
          {message && (
            <div className={message === 'Правильно! Ты умничка' ? 'correct' : 'incorrect'}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;