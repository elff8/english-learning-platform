import React from 'react';
import '../style/ProgressPage.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressPage = () => {
  const progressData = [
    { day: 'День 1', score: 25.1 },
    { day: 'День 2', score: 50.1 },
    { day: 'День 3', score: 75.1 },
    { day: 'День 4', score: 100.1 },
  ];

  return (
    <div className="progress-container">
      <h1 className="progress-title">Прогресс пользователя</h1>
      
      <div className="progress-stats">
        <div className="stat-card">
          <div className="stat-value">10</div>
          <div className="stat-label">Всего упражнений сделано</div>
        </div>
      </div>

      <div className="progress-divider"></div>

      <div className="progress-chart-section">
        <h2>Динамика прогресса</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#7b2cbf" 
                strokeWidth={2}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;