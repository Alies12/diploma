import React, { useState } from 'react';
import FormTemplate from '../components/FormTemplate';
import api from '../api/api.js';

const Contacts = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      const requestData = {
        fullname: formData['имя'].trim(),  
        email: formData['почта'].trim().toLowerCase(),
        description: formData['сообщение']?.trim() || ''
      };

      console.log('Отправляемые данные:', requestData);

      const response = await api.postFeedback(requestData);
      console.log('Ответ сервера:', response);
      
      setSubmitSuccess(true);
      return true;
    } catch (error) {
      console.error('Полная ошибка:', error);
      
      let errorMessage = 'Произошла ошибка при отправке формы';
      
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        const fullNameError = serverErrors.find(e => e.path === 'fullName');
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

  return (
    <section className="page-section">
      <h2>Наши контакты</h2>
      <p>Телефон: +7 (999) 123-45-67</p>
      <p>Email: info@sunny-center.ru</p>
      <div className="contact-container">
        <div className="map-placeholder">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1024055.7321625402!2d28.0544434625!3d59.91374079999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469631197fdcab2f%3A0x84100f9c1aa8cab4!2zSVQt0LrQvtC70LvQtdC00LYg0KXQtdC60YHQu9C10YI!5e0!3m2!1sru!2snl!4v1747495884986!5m2!1sru!2snl" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        {submitSuccess ? (
          <div className="success-message">
            Ваше сообщение успешно отправлено! Спасибо за обратную связь.
          </div>
        ) : (
          <div className="form-wrapper">
            <FormTemplate
              title="Форма обратной связи"
              fields={['имя', 'почта', 'сообщение']}
              requiredFields={['имя', 'почта']}
              customValidation={(data) => {
                const errors = {};
                
                if (data['имя'] && !/^[a-zA-Zа-яА-ЯёЁ\s-]{2,}$/.test(data['имя'].trim())) {
                  errors['имя'] = 'Имя должно содержать минимум 2 буквы (можно использовать дефис)';
                }
                
                if (data['почта'] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data['почта'].trim())) {
                  errors['почта'] = 'Введите корректный email (например, example@mail.com)';
                }

                return errors;
              }}
              onSubmit={handleFormSubmit}
              submitText={isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
              isSubmitting={isSubmitting}
            />
            
            {submitError && (
              <div className="error-message">
                {submitError}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contacts;