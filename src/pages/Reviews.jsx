// src/pages/Reviews.js
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../DataContext';
import FormTemplate from '../components/FormTemplate';
import api from '../api/api';

const Reviews = () => {
  const { data, loading, error, refetch } = useContext(DataContext);
  const [feedbackList, setFeedbackList] = useState(data.parentsFeedback || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (data.parentsFeedback) {
      setFeedbackList(data.parentsFeedback);
    }
  }, [data.parentsFeedback]);

  if (loading) return <div className="loading">Загрузка отзывов...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  const handleFeedbackSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const feedbackData = {
        fullname: formData['имя'].trim(),
        email: formData['почта'].trim().toLowerCase(),
        description: formData['отзыв']?.trim() || '',
      };

      console.log('Отправляемые данные:', feedbackData);

      await api.postParentsFeedback(feedbackData);
      const updatedFeedback = await api.getParents_feedback();
      setFeedbackList(updatedFeedback);

      setSubmitSuccess(true);
      return true;
    } catch (error) {
      console.error('Полная ошибка:', error);

      let errorMessage = 'Произошла ошибка при отправке отзыва';

      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        const fullNameError = serverErrors.find(e => e.path === 'fullname');
        if (fullNameError) {
          errorMessage = `Ошибка в поле Имя: ${fullNameError.msg}`;
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

    if (formData['имя'] && !/^[a-zA-Zа-яА-ЯёЁ\s-]{2,}$/.test(formData['имя'].trim())) {
      errors['имя'] = 'Имя должно содержать минимум 2 буквы (можно использовать дефис)';
    }

    if (formData['почта'] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData['почта'].trim())) {
      errors['почта'] = 'Введите корректный email (например, example@mail.com)';
    }

    if (formData['отзыв'] && (formData['отзыв'].trim().length < 10 )) {
      errors['отзыв'] = 'Отзыв должен быть минимум 10 символов ';
    }

    return errors;
  };

  return (
    <section className="page-section">
      <h2>Отзывы родителей</h2>
      <div className="reviews-grid">
        {feedbackList.length > 0 ? (
          feedbackList.map(feedback => (
            <div key={feedback.id} className="review-card">
              <h3 className="review-name">{feedback.fullname}</h3>
              <p className="review-email">{feedback.email}</p>
              <p className="review-description">{feedback.description}</p>
            </div>
          ))
        ) : (
          <p>Отзывов пока нет</p>
        )}
      </div>
      {submitSuccess ? (
        <div className="success-message">
          Ваш отзыв успешно отправлен! Спасибо за обратную связь.
        </div>
      ) : (
        <div className="form-wrapper">
          <FormTemplate
            title="Оставить отзыв"
            fields={['имя', 'почта', 'отзыв']}
            requiredFields={['имя', 'почта', 'отзыв']}
            customValidation={customValidation}
            onSubmit={handleFeedbackSubmit}
            submitText={isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
            isSubmitting={isSubmitting}
            textareaField="отзыв"
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

export default Reviews;