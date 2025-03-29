import React, { useState } from 'react';

const FormTemplate = ({ 
  title, 
  fields,
  onSubmit,
  submitText = 'Отправить',
  selectOptions = {},
  requiredFields = [],
  customValidation
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = 'Это поле обязательно для заполнения';
      }
    });

    if (customValidation) {
      const customErrors = customValidation(formData);
      Object.assign(newErrors, customErrors);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getInputType = (field) => {
    if (field.includes('password')) return 'password';
    if (field.includes('email')) return 'email';
    if (field.includes('date')) return 'date';
    if (field.includes('phone')) return 'tel';
    return 'text';
  };

  return (
    <div className="form-template">
      {title && <h3>{title}</h3>}
      <form onSubmit={handleSubmit} noValidate>
        {fields.map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>
              {field.replace(/-/g, ' ').replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
              {requiredFields.includes(field) && <span className="required-star">*</span>}
            </label>
            
            {selectOptions[field] ? (
              <select
                id={field}
                name={field}
                value={formData[field] || ''}
                onChange={handleInputChange}
                className={errors[field] ? 'error' : ''}
                required={requiredFields.includes(field)}
              >
                <option value="">Выберите...</option>
                {selectOptions[field].map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.includes('message') || field.includes('comment') || field.includes('review') ? (
              <textarea
                id={field}
                name={field}
                value={formData[field] || ''}
                onChange={handleInputChange}
                className={errors[field] ? 'error' : ''}
                rows="4"
                required={requiredFields.includes(field)}
              />
            ) : (
              <input
                id={field}
                name={field}
                type={getInputType(field)}
                value={formData[field] || ''}
                onChange={handleInputChange}
                className={errors[field] ? 'error' : ''}
                placeholder={`Введите ${field.replace(/-/g, ' ').replace(/_/g, ' ')}`}
                required={requiredFields.includes(field)}
              />
            )}
            
            {errors[field] && <div className="error-message">{errors[field]}</div>}
          </div>
        ))}

        <button type="submit" className="submit-btn">
          {submitText}
        </button>
      </form>
    </div>
  );
};

export default FormTemplate;