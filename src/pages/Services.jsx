import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../DataContext';
import FormTemplate from '../components/FormTemplate';
import api from '../api/api.js';

const Services = () => {
  const { data, loading, error, refetch } = useContext(DataContext);
  const services = data.services || [];
  const [serviceList, setServiceList] = useState(data.services || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (data.services) {
      setServiceList(data.services);
    }
  }, [data.services]);

  if (loading) return <div className="loading">Загрузка услуг...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  const handleServiceSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const serviceData = {
        fullname: formData['имя'].trim(),
        email: formData['почта'].trim().toLowerCase(),
        phoneNumber: formData['телефон'].trim(),
        service: formData['описание'].trim(), 
      };

      console.log('Отправляемые данные (Services):', serviceData);

      await api.postService(serviceData);
      const updatedServices = await api.getServices();
      setServiceList(updatedServices);

      setSubmitSuccess(true);
      return true;
    } catch (error) {
      console.error('Полная ошибка (Services):', error);

      let errorMessage = 'Произошла ошибка при отправке заявки';

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

    if (formData['телефон'] && !/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,4}$/.test(formData['телефон'].trim())) {
      errors['телефон'] = 'Введите корректный телефон (например, +79991234567)';
    }

    if (!formData['описание'] || formData['описание'].trim().length < 10) {
      errors['описание'] = 'Описание должно быть минимум 10 символов ';
}

    return errors;
  };

  return (
    <section className="page-section">
      <h2>Услуги</h2>
      <div className="services-grid">
        {serviceList.length > 0 ? (
          serviceList.map(service => (
            <div key={service.id} className="news-card">
              <h3 className="service-name">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))
        ) : (
          <p>Услуг пока нет</p>
        )}
      </div>
      {submitSuccess ? (
        <div className="success-message">
          Ваша заявка на пробное занятие успешно отправлена! Спасибо.
        </div>
      ) : (
        <div className="form-wrapper">
          <FormTemplate
            title="Оставить заявку на пробное занятие"
            fields={['имя', 'почта', 'телефон', 'описание']}
            requiredFields={['имя', 'почта', 'телефон', 'описание']}
            customValidation={customValidation}
            onSubmit={handleServiceSubmit}
            submitText={isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            isSubmitting={isSubmitting}
            textareaField="описание"
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

export default Services;