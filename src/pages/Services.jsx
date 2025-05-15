import FormTemplate from '../components/FormTemplate';

const Services = () => {
  return (
    <section className="page-section">
      <h2>Наши Услуги</h2>
      <div className="service-list">
      </div>
      <FormTemplate 
        title="Запись на услугу"
        fields={['имя', 'телефон', 'почта', 'услуга']}
      />
    </section>
  );
};

export default Services;