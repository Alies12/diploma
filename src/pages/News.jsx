import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../DataContext';
import FormTemplate from '../components/FormTemplate';
import api from '../api/api';

const News = () => {
  const { data, loading, error, refetch } = useContext(DataContext);
  const news = data.news || [];
  const [newsComments, setNewsComments] = useState(data.newsComments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (data.newsComments) {
      setNewsComments(data.newsComments);
    }
  }, [data.newsComments]);

  if (loading) return <div className="loading">Загрузка новостей...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  const handleCommentSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const commentData = {
        fullname: formData['имя'].trim(),
        email: formData['почта'].trim().toLowerCase(),
        description: formData['комментарий']?.trim() || '',
      };

      console.log('Отправляемые данные:', commentData);

      await api.postNewsComment(commentData);
      const updatedComments = await api.getNewsComments();
      setNewsComments(updatedComments);

      setSubmitSuccess(true);
      return true;
    } catch (error) {
      console.error('Полная ошибка:', error);

      let errorMessage = 'Произошла ошибка при отправке комментария';

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

    if (formData['комментарий'] && (formData['комментарий'].trim().length < 10 )) {
      errors['комментарий'] = 'Комментарий должен быть минимум 10 ';
    }

    return errors;
  };

  return (
    <section className="page-section">
      <h2>Новости и события</h2>
      <div className="news-card">
        {news.length > 0 ? (
          news.map(item => (
            <article key={item.id} className="news-article">
              <h3 className="news-title">{item.fullname}</h3>
              <p className="news-description">{item.description}</p>
              <div className="news-meta">
                <time className="news-date" dateTime={item.date}>
                  {new Date(item.date).toLocaleDateString()}
                </time>
                <span className="news-email">{item.email}</span>
              </div>
            </article>
          ))
        ) : (
          <p>Новостей пока нет</p>
        )}
      </div>
      <div className="comments-section">
        <h3>Комментарии</h3>
        {newsComments.length > 0 ? (
          newsComments.map(comment => (
            <div key={comment.id} className="news-card">
              <h4 className="comment-name">{comment.fullname}</h4>
              <p className="comment-description">{comment.description}</p>
            </div>
          ))
        ) : (
          <p>Комментариев пока нет</p>
        )}
      </div>
      {submitSuccess ? (
        <div className="success-message">
          Ваш комментарий успешно отправлен! Спасибо за участие.
        </div>
      ) : (
        <div className="form-wrapper">
          <FormTemplate
            title="Комментировать новость"
            fields={['имя', 'почта', 'комментарий']}
            requiredFields={['имя', 'почта', 'комментарий']}
            customValidation={customValidation}
            onSubmit={handleCommentSubmit}
            submitText={isSubmitting ? 'Отправка...' : 'Отправить комментарий'}
            isSubmitting={isSubmitting}
            textareaField="комментарий"
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

export default News;