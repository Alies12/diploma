import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormTemplate from "../components/FormTemplate";
import api from '../api/api';
import '../App.css';

const Auth = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [activeForm, setActiveForm] = useState('login');

  const handleAuthSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const email = formData['почта'].trim().toLowerCase();
      const password = formData['пароль']?.trim();

      if (activeForm === 'register') {
        // Регистрация
        await api.postRegister({
          username: formData['имя'].trim(),
          email,
          password,
          phone: formData['телефон']?.trim() || ''
        });

        // Автоматический вход после регистрации
        const loginResponse = await api.postLogin({ email, password });
        localStorage.setItem('authToken', loginResponse.token);
        localStorage.setItem('userData', JSON.stringify(loginResponse.user));
        navigate('/cabinet');
      } 
      else if (activeForm === 'login') {
        // Обычный вход
        const response = await api.postLogin({ email, password });
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        navigate('/cabinet');
      } 
      else if (activeForm === 'recovery') {
        await api.postPasswordRecovery({ email });
        setSubmitError('Инструкции по восстановлению пароля отправлены на вашу почту');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setSubmitError(
        error.response?.data?.message || 
        'Произошла ошибка. Пожалуйста, попробуйте снова'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,}$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,4}$/;

    if (!formData['почта'] || !emailRegex.test(formData['почта'])) {
      errors['почта'] = 'Введите корректный email';
    }

    if (activeForm !== 'recovery') {
      if (!formData['пароль'] || formData['пароль'].length < 6) {
        errors['пароль'] = 'Пароль должен быть не менее 6 символов';
      }
    }

    if (activeForm === 'register') {
      if (!formData['имя'] || !nameRegex.test(formData['имя'])) {
        errors['имя'] = 'Имя должно содержать минимум 2 буквы';
      }

      if (formData['телефон'] && !phoneRegex.test(formData['телефон'])) {
        errors['телефон'] = 'Введите корректный номер телефона';
      }
    }

    return errors;
  };

  const formConfigs = {
    login: {
      title: 'Вход в аккаунт',
      fields: ['почта', 'пароль'],
      submitText: 'Войти',
      links: [
        { text: 'Нет аккаунта? Зарегистрироваться', action: () => setActiveForm('register') },
        { text: 'Забыли пароль?', action: () => setActiveForm('recovery') }
      ]
    },
    register: {
      title: 'Регистрация',
      fields: ['имя', 'почта', 'пароль', 'телефон'],
      submitText: 'Зарегистрироваться',
      links: [
        { text: 'Уже есть аккаунт? Войти', action: () => setActiveForm('login') }
      ]
    },
    recovery: {
      title: 'Восстановление пароля',
      fields: ['почта'],
      submitText: 'Отправить',
      links: [
        { text: 'Вернуться к входу', action: () => setActiveForm('login') }
      ]
    }
  };

  const currentForm = formConfigs[activeForm];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{currentForm.title}</h2>
        
        {submitError && (
          <div className="auth-error">
            <p>{submitError}</p>
            <button 
              className="auth-close"
              onClick={() => setSubmitError(null)}
            >
              ×
            </button>
          </div>
        )}

        <FormTemplate
          fields={currentForm.fields}
          onSubmit={handleAuthSubmit}
          submitText={isSubmitting ? 'Обработка...' : currentForm.submitText}
          customValidation={validateForm}
        />

        <div className="auth-links">
          {currentForm.links.map((link, index) => (
            <button
              key={index}
              type="button"
              className="auth-link"
              onClick={link.action}
            >
              {link.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auth;