import FormTemplate from '../components/FormTemplate';

const Schedule = () => {
  return (
    <section className="page-section">
      <h2>Расписание занятий</h2>
      <div className="schedule-container">
        <div className="timetable">
          <div className="timetable-day">
            <h3>Понедельник</h3>
            <ul>
              <li>10:00 - Развивающие игры (3-5 лет)</li>
              <li>12:00 - Творческая мастерская (4-6 лет)</li>
              <li>15:00 - Подготовка к школе (5-7 лет)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;