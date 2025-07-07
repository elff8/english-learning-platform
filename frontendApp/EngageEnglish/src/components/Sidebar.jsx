import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isOpen, setIsOpen] = useState(true);
  const [lessonsOpen, setLessonsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleLessons = () => setLessonsOpen(!lessonsOpen);

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={toggleSidebar} className="toggle-btn">
        {isOpen ? '←' : '→'}
      </button>
      <ul>
        <li>
          <a href="/" className={currentPath === '/' ? 'active' : ''}>
            <span className="material-icons">home</span> Главная страница
          </a>
        </li>
        <li>
          <div onClick={toggleLessons} className="menu-item">
            <span className="material-icons">school</span> Задания {lessonsOpen ? '▲' : '▼'}
          </div>
          <div className={`submenu-container ${lessonsOpen ? 'open' : 'closed'}`}>
            <ul className="submenu">
              <li>
                <a
                  href="/FlashCards/"
                  className={currentPath.startsWith('/FlashCards') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Карточки
                </a>
              </li>
              <li>
                <a
                  href="/MissingWord/"
                  className={currentPath.startsWith('/MissingWord') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Пропущенные слова
                </a>
              </li>
              <li>
                <a
                  href="/tests/"
                  className={currentPath.startsWith('/tests') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Тесты
                </a>
              </li>
              <li>
                <a
                  href="/pronunciationLesson/"
                  className={currentPath.startsWith('/pronunciationLesson') ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Произношение
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <a href="/progress" className={currentPath === '/progress' ? 'active' : ''}>
            <span className="material-icons">assessment</span> Прогресс
          </a>
        </li>
        <li>
          <a href="/profile" className={currentPath === '/profile' ? 'active' : ''}>
            <span className="material-icons">person</span> Профиль
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
