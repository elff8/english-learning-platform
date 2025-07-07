import React, { useState, useEffect } from 'react';
import '../style/MissingWord.css';

const MissingWord = () => {
  const [categories, setCategories] = useState([]);
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [noSentencesMessage, setNoSentencesMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/learning/Category')
      .then(response => response.json())
      .then(data => setCategories(data));

    fetch('http://localhost:5000/api/learning/DifficultyLevel')
      .then(response => response.json())
      .then(data => setDifficultyLevels(data));
  }, []);

  useEffect(() => {
    if (sentences.length > 0) {
      setAnswers(sentences.map(() => ({
        userInput: '',
        isCorrect: null,
        isChecked: false
      })));
    }
  }, [sentences]);

  const loadSentences = () => {
    const url = new URL('http://localhost:5000/api/learning/MissingWord');
    if (selectedCategory) url.searchParams.append('categoryId', selectedCategory);
    if (selectedDifficulty) url.searchParams.append('difficultyLevelId', selectedDifficulty);
  
    fetch(url)
      .then(response => {
        if (response.status === 404) {
          return response.json().then(errorData => {
            setNoSentencesMessage(errorData.message || 'Неизвестная ошибка');
            return [];
          });
        }
        return response.json();
      })
      .then(data => {
        setSentences(data);
        setCurrentSentenceIndex(0); 
        if (data.length === 0) {
          setNoSentencesMessage('❗ Нет предложений для выбранной категории и уровня сложности.');
        } else {
          setNoSentencesMessage('');
        }
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
        setNoSentencesMessage('Произошла ошибка при загрузке предложений.');
      });
  };
  

  useEffect(() => {
    loadSentences();
  }, [selectedCategory, selectedDifficulty]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const nextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
      setShowTranslation(false);
    }
  };

  const previousSentence = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
      setShowTranslation(false);
    }
  };

 

  const handleInputChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-zА-Яа-яЁё]*$/;
    if (regex.test(value)) {
      const newAnswers = [...answers];
      newAnswers[currentSentenceIndex].userInput = value;
      setAnswers(newAnswers);
    }
  };

  const checkAnswer = () => {
    if (!sentences[currentSentenceIndex] || !answers[currentSentenceIndex]?.userInput.trim()) return;
    
    const correctWord = sentences[currentSentenceIndex].correctWord || '';
    const isAnswerCorrect = answers[currentSentenceIndex].userInput.trim().toLowerCase() === 
                          correctWord.toLowerCase();
    
    const newAnswers = [...answers];
    newAnswers[currentSentenceIndex] = {
      ...newAnswers[currentSentenceIndex],
      isCorrect: isAnswerCorrect,
      isChecked: true
    };
    setAnswers(newAnswers);
  };

  const currentAnswer = answers[currentSentenceIndex] || { 
    userInput: '', 
    isCorrect: null, 
    isChecked: false 
  };

  return (
    <div className="container">
      <h1>Вставить пропущенное слово</h1>
      <p>Заполните пропуски в предложениях.</p>

      <div className="select-group">
        <label>Выберите категорию:</label>
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">Все категории</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="select-group">
        <label>Выберите уровень сложности:</label>
        <select onChange={handleDifficultyChange} value={selectedDifficulty}>
          <option value="">Все уровни</option>
          {difficultyLevels.map(level => (
            <option key={level.id} value={level.id}>{level.name}</option>
          ))}
        </select>
      </div>

      {noSentencesMessage && <p className="no-sentences">{noSentencesMessage}</p>}

      {sentences.length > 0 && sentences[currentSentenceIndex] && (
  <div className="exercise-container">
    <p className="sentence">{sentences[currentSentenceIndex].sentenceWithBlank}</p>
<p className="translation">{sentences[currentSentenceIndex].translation}</p>  

<div className="answer-section">
  <input
    type="text"
    placeholder="Ваш ответ"
    value={currentAnswer.userInput}
    onChange={handleInputChange}
    disabled={currentAnswer.isChecked}
    className={currentAnswer.isChecked ? 
      (currentAnswer.isCorrect ? 'correct-input' : 'incorrect-input') : ''}
  />

  <button 
    onClick={checkAnswer} 
    disabled={!currentAnswer.userInput.trim() || currentAnswer.isChecked}
  >
    Проверить
  </button>
</div>


    {currentAnswer.isChecked && (
      <div className={`feedback ${currentAnswer.isCorrect ? 'correct' : 'incorrect'}`}>
        {currentAnswer.isCorrect ? '✅ Правильно!' : 
         ` Неправильно. Правильный ответ: ${sentences[currentSentenceIndex].correctWord}`}
      </div>
    )}


  </div>
)}


      <div className="navigation-buttons">
        <button onClick={previousSentence} disabled={currentSentenceIndex === 0}>
          Предыдущее
        </button>
        <button onClick={nextSentence} disabled={currentSentenceIndex === sentences.length - 1}>
          Следующее
        </button>
      </div>
    </div>
  );
};

export default MissingWord;