import FormTemplate from '../components/FormTemplate';

const Programs = () => {
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
      <FormTemplate
        title="Запись на пробное занятие"
        fields={['child-name', 'parent-name', 'phone', 'age-group']}
      />
    </section>
  );
};

export default Programs;