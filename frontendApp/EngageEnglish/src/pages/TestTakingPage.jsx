import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import '../style/TestTakingPage.css';
import axios from "axios";

const TestTakingPage = () => {
  const { id } = useParams();
  const { state } = useLocation(); 
  const [test, setTest] = useState(state?.test || null); 
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/learning/TestFiltered?id=${id}`)
        .then(res => setTest(res.data))
        .catch(err => console.error("Ошибка загрузки теста", err));
    }
  }, [id]);
  

  

  const handleSubmit = () => {
    console.log("Ответы пользователя:", answers);
    alert("Тест завершён! (отправка пока не реализована)");
  };
    const handleRestartTest = () => {
      setAnswers({});
      setCurrentQuestionIndex(0);
      setIsFinished(false);
      history.push(`/test/${id}`); 
    };
  const handleGoBackToTests = () => {
    history.push('/test-filter'); 
  };

  

  if (!test) return <p>Загрузка теста...</p>;


const questions = test.questions || [];
const calculateScore = () => {
  let correctCount = 0;
  for (const question of questions) {
    const selected = answers[question.id];
    const correctOption = question.answerOptions.find(opt => opt.isCorrect);
    if (selected === correctOption?.id) {
      correctCount++;
    }
  }
  return correctCount;
};

if (isFinished) {
  const score = calculateScore();
  return (
    <div className="page-container">
      <div className="test-container">
        <h2>Результат теста</h2>
        <p>Вы ответили правильно на {score} из {test.questions.length} вопросов.</p>
        <button onClick={handleRestartTest}>Пройти этот тест заново</button>
        <button onClick={handleGoBackToTests}>Вернуться к тестам</button>
      </div>
    </div>
  );
}

const currentQuestion = questions[currentIndex];
const selectedAnswer = answers[currentQuestion.id];

const handleOptionChange = (questionId, answerId) => {
  setAnswers(prev => ({
    ...prev,
    [questionId]: answerId
  }));
};


  

return (
    <div className="test-container">
      <h2>{test.title}</h2>
      <p><strong>Категория:</strong> {test.category}</p>
      <p><strong>Уровень:</strong> {test.difficulty}</p>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`
          }}
        />
      </div>
      <p className="progress-text">
        Вопрос {currentIndex + 1} из {questions.length}
      </p>

      <div className="question-indicators">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`question-indicator ${index <= currentIndex ? "completed" : ""}`}
          />
        ))}
      </div>

      <div
        key={currentQuestion.id}
        className="fade-question"
      >
        <h3>Вопрос {currentIndex + 1} из {questions.length}</h3>
        <p><strong>{currentQuestion.questionText}</strong></p>

        {currentQuestion.answerOptions.map(option => (
          <div key={option.id}>
            <label  className="custom-radio">
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option.id}
                checked={selectedAnswer === option.id}
                onChange={() => handleOptionChange(currentQuestion.id, option.id)}
              />
                <span className="radio-mark"></span>
              {option.answerText}
            </label>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
          disabled={currentIndex === 0}
        >
          Назад
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(prev => Math.min(prev + 1, questions.length - 1))}
            disabled={selectedAnswer == null}
          >
            Далее
          </button>
        ) : (
          <button onClick={() => setIsFinished(true)} disabled={selectedAnswer == null}>
            Завершить тест
          </button>
        )}
      </div>
    </div>
);
};

export default TestTakingPage;