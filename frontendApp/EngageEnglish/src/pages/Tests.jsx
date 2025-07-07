import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../style/Tests.css';

const TestFilterPage = () => {
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/learning/TestCategory").then(res => setCategories(res.data));
    axios.get("http://localhost:5000/api/learning/DifficultyLevel").then(res => setLevels(res.data));
  }, []);

  const fetchFilteredTests = () => {
    if (!selectedCategory || !selectedLevel) return;

    axios.get(`http://localhost:5000/api/learning/TestFiltered?testCategoryId=${selectedCategory}&difficultyLevelId=${selectedLevel}`)
      .then(res => {
        setTests(res.data);
        setError("");
      })
      .catch(err => {
        setTests([]);
        setError("Тестов не найдено по выбранным фильтрам.");
      });
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h2>Выберите фильтры</h2>

        <div className="select-group">
          <label>Категория:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">-- Выбрать --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label>Уровень сложности:</label>
          <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
            <option value="">-- Выбрать --</option>
            {levels.map(level => (
              <option key={level.id} value={level.id}>{level.name}</option>
            ))}
          </select>
        </div>

        <button onClick={fetchFilteredTests}>Показать тесты</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <h3 className="tests-title">Тесты:</h3>

        <div className="test-list">
          {tests.map(test => (
            <div key={test.id} className="test-card">
              <h4>{test.title}</h4>
              <p>{test.description}</p>
              <p><strong>Категория:</strong> {test.category}</p>
              <p><strong>Уровень:</strong> {test.difficulty}</p>

              <div className="test-button-wrapper">
                <Link to={`/test/${test.id}`}>
                  <button className="center-button">Пройти тест</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestFilterPage;
