import { useContext } from 'react';
import { DataContext } from '../DataContext';

const About = () => {
  const { data, loading, error } = useContext(DataContext);
  const employees = data.employees || [];

  return (
    <section className="page-section">
      <h2>О нашем центре</h2>
      <div className="about-content">
        <div className="mission">
          <h3>Наша миссия</h3>
          <p>Создание среды для гармоничного развития детей через творчество и игру</p>
        </div>
        <div className="team">
          <h3>Наша команда</h3>
          {loading && <div className="loading">Загрузка сотрудников...</div>}
          {error && <div className="error">Ошибка: {error}</div>}
          <div className="team-members">
            {employees.length > 0 ? (
              employees.map(employee => (
                <div key={employee.id} className="team-member-card">
                  <div className="team-member-content">
                    <img
                      src={employee.photo || '/def.jpg'}
                      alt={employee.fullname}
                      className="team-member-photo"
                      onError={(e) => {
                        e.target.src = '/def.jpg';
                      }}
                    />
                    <div className="team-member-details">
                      <h4 className="team-member-name">{employee.fullname}</h4>
                      <p className="team-member-description">{employee.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !loading && <p>Сотрудников пока нет</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;