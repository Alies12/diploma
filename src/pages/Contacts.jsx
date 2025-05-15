import FormTemplate from '../components/FormTemplate';

const Contacts = () => {
  return (
    <section className="page-section">
      <h2>Наши контакты</h2>
      <div className="contact-container">
        <div className="map-placeholder">
          {/* Место для карты */}
          <p>Карта расположения центра</p>
        </div>
        <FormTemplate
          title="Форма обратной связи"
          fields={['имя', 'почта', 'сообщение']}
        />
      </div>
    </section>
  );
};

export default Contacts;