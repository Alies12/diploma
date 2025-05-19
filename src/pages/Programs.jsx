// src/pages/Programs.js
import React, { useState } from 'react';
import FormTemplate from '../components/FormTemplate';
import api from '../api/api';

const Programs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const requestData = {
        fullNameParent: formData['Имя родителя'].trim(),
        fullNameChild: formData['Имя ребёнка'].trim(),
        phoneNumber: formData['Телефон'].trim(),
        ageGroup: formData['Возрастная группа']?.trim() || '',
      };

      console.log('Отправляемые данные:', requestData);

      const response = await api.postPrograms(requestData);
      console.log('Ответ сервера:', response);

      setSubmitSuccess(true);
      return true;
    } catch (error) {
      console.error('Полная ошибка:', error);

      let errorMessage = 'Произошла ошибка при записи на занятие';

      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        const fullNameParentError = serverErrors.find(e => e.path === 'fullNameParent');
        if (fullNameParentError) {
          errorMessage = `Ошибка в поле Имя родителя: ${fullNameParentError.msg}`;
        } else {
          errorMessage = serverErrors.map(e => e.msg).join(', ');
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setSubmitError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const customValidation = (formData) => {
    const errors = {};

    if (formData['Имя родителя'] && !/^[a-zA-Zа-яА-ЯёЁ\s-]{2,}$/.test(formData['Имя родителя'].trim())) {
      errors['Имя родителя'] = 'Имя должно содержать минимум 2 буквы (можно использовать дефис)';
    }

    if (formData['Имя ребёнка'] && !/^[a-zA-Zа-яА-ЯёЁ\s-]{2,}$/.test(formData['Имя ребёнка'].trim())) {
      errors['Имя ребёнка'] = 'Имя должно содержать минимум 2 буквы (можно использовать дефис)';
    }

    if (formData['Телефон'] && !/^\+7\d{10}$/.test(formData['Телефон'].trim())) {
      errors['Телефон'] = 'Формат: +79998887766';
    }

    if (!formData['Возрастная группа']) {
      errors['Возрастная группа'] = 'Выберите возрастную группу';
    }

    return errors;
  };

  return (
    <section className="page-section">
      <h2>Наши программы</h2>
      <div className="programs-list">
        <div className="program-card">
          <h3>Раннее развитие (1-3 года)</h3>
          <p>Сенсорное развитие и мелкая моторика</p>
        </div>
        <div className="program-card">
          <h3>Дошкольная подготовка (4-7 лет)</h3>
          <p>Обучение чтению, счету и логике</p>
        </div>
      </div>
      {submitSuccess ? (
        <div className="success-message">
          Вы успешно записаны на пробное занятие! Спасибо.
        </div>
      ) : (
        <div className="form-wrapper">
          <FormTemplate
            title="Запись на пробное занятие"
            fields={['Имя ребёнка', 'Имя родителя', 'Телефон', 'Возрастная группа']}
            requiredFields={['Имя ребёнка', 'Имя родителя', 'Телефон', 'Возрастная группа']}
            selectOptions={{
              'Возрастная группа': [
                { value: '1-3 года', label: '1-3 года' },
                { value: '4-7 лет', label: '4-6 лет' },
              ],
            }}
            customValidation={customValidation}
            onSubmit={handleFormSubmit}
            submitText={isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
            isSubmitting={isSubmitting}
          />
          {submitError && (
            <div className="error-message">
              {submitError}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Programs;