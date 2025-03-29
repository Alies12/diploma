import FormTemplate from '../components/FormTemplate';

const Services = () => {
  return (
    <section className="page-section">
      <h2>Наши Услуги</h2>
      <div className="service-list">
      </div>
      <FormTemplate 
        title="Запись на занятия"
        fields={['name', 'phone', 'email', 'service']}
      />
    </section>
  );
};

export default Services;