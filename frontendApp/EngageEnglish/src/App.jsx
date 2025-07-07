import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';  
import { AuthProvider } from './components/AuthContext'; 
import Home from './pages/Home';
import AuthPage from './pages/AuthPage'
import Progress from './pages/Progress';
import Tests from './pages/Tests';
import TestTakingPage from './pages/TestTakingPage';
import PronunciationLesson from './pages/PronunciationLesson';
import Profile from './pages/Profile';
import Flashcards from './pages/Flashcards';
import MissingWord from './pages/MissingWord';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Topbar />
          <div className="main-container">
            <SidebarWithLocation />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/missingWord" element={<MissingWord />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/test/:id" element={<TestTakingPage />} />
                <Route path="/pronunciationLesson" element={<PronunciationLesson />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <div className="animated-waves"></div>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

function SidebarWithLocation() {
  const location = useLocation();
  return <Sidebar currentPath={location.pathname} />;
}

export default App;
