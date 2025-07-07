import React, { useState } from 'react';
import '../style/ProfilePage.css';
import defaultAvatar from '../assets/default-avatar.jpg'; 

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: 'User123',
    email: 'user@example.com',
    avatar: defaultAvatar
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Данные сохранены:', userData);
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData(prev => ({ ...prev, avatar: event.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Профиль</h1>
      
      <div className="profile-content">
        <div className="avatar-section">
          <img src={userData.avatar} alt="Аватар" className="profile-avatar" />
          {isEditing && (
            <>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="avatar-upload" className="change-avatar-btn">
                Изменить аватар
              </label>
            </>
          )}
        </div>
        
        <div className="profile-fields">
          <div className="field-group">
            <label>Имя пользователя:</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <div className="profile-info">{userData.username}</div>
            )}
          </div>
          
          <div className="field-group">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="profile-input"
              />
            ) : (
              <div className="profile-info">{userData.email}</div>
            )}
          </div>
          
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="save-btn">
                  Сохранить изменения
                </button>
                <button onClick={() => setIsEditing(false)} className="cancel-btn">
                  Отмена
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)} 
                className="edit-btn"
                style={{ margin: '0 auto' }}
              >
                Редактировать профиль
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;