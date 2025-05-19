// src/pages/Schedule.js
import { useContext } from "react";
import { DataContext } from "../DataContext";
import FormTemplate from "../components/FormTemplate";

const Schedule = () => {
  const { data, loading, error } = useContext(DataContext);
  const schedule = data.schedule || [];

  return (
    <section className="page-section">
      <h2>Расписание занятий</h2>
      <div className="schedule-container">
        <div className="timetable">
          {loading && <div className="loading">Загрузка расписания...</div>}
          {error && <div className="error">Ошибка: {error}</div>}
          {schedule.length > 0
            ? schedule.map((item) => (
                <div key={item.id} className="timetable-day">
                  <h3>{item.weekDay}</h3>
                  <p className="timetable-description">
                    {item.description.split(",").map((part, index) => (
                      <span key={index}>
                        {part.trim()}
                        {index < item.description.split(",").length - 1 && (
                          <br />
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              ))
            : !loading && <p>Расписание пока недоступно</p>}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
