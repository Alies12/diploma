import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalCabinet = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, есть ли токен в localStorage
    if (!localStorage.getItem('authToken')) {
      navigate('/login'); // или на другую страницу, если пользователь не авторизован
    }
  }, [navigate]);

  return (
   <section className="page-section personal-cabinet">
      <div className="user-info">
        <h2>Личный кабинет</h2>
        <div className="user-card">
          <div className="avatar-placeholder"></div>
          <div className="user-details">
            <p><strong>Имя:</strong> Мария Иванова</p>
            <p><strong>Email:</strong> maria@example.com</p>
            <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
          </div>
        </div>
        <Link to="/auth" className="edit-profile-btn">Редактировать профиль</Link>
      </div>

      <div className="booking-history">
        <h3>История записей</h3>
        <div className="booking-list">
          <div className="booking-item">
            <p>Дата: 25.08.2023</p>
            <p>Услуга: Подготовка к школе</p>
            <p>Статус: Подтверждено</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalCabinet;