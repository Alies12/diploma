import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import jwtDecode from '../utils/jwt';

const PersonalCabinet = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const authToken = localStorage.getItem('authToken');


  const tokenPayload = authToken ? jwtDecode(authToken) : null;
  const userId = tokenPayload?.id;


  useEffect(() => {
    if (!authToken) {
      navigate('/auth');
      return;
    }

    const fetchHistory = async () => {
      try {
        setLoading(true);
        const historyData = await api.getUserHistory(userId, authToken);
        setHistory(historyData);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке истории записей:', err);
        setError(err.message || 'Не удалось загрузить историю записей');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchHistory();
    } else {
      setError('ID пользователя не найден');
      setLoading(false);
    }
  }, [authToken, userId, navigate]);

  // Обработчик выхода
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/auth');
  };

  return (
    <section className="page-section personal-cabinet">
      <div className="user-info">
        <h2>Личный кабинет</h2>
        <div className="user-card">
          <div className="user-details">
            <p><strong>Имя:</strong> {userData.username || 'Не указано'}</p>
            <p><strong>Email:</strong> {userData.email || 'Не указано'}</p>
            <p><strong>Телефон:</strong> {userData.phone || 'Не указано'}</p>
          </div>
        </div>
        <div className="logout-container">
          <button onClick={handleLogout} className="logout-btn">
            Выйти
          </button>
        </div>
      </div>

      <div className="booking-history">
        <h3>История записей</h3>
        {loading && <div className="loading">Загрузка истории...</div>}
        {error && <div className="error-message">{error}</div>}
        <div className="booking-list">
          {history.length > 0 ? (
            history.map((item) => (
              <div key={item.id} className="booking-item">
                <p>
                  <strong>Дата:</strong>{' '}
                  {new Date(item.date).toLocaleString('ru-RU', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </p>
                <p><strong>Услуга:</strong> {item.service}</p>
                <p><strong>Статус:</strong> {item.status}</p>
              </div>
            ))
          ) : (
            !loading && <p>Записей пока нет</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonalCabinet;