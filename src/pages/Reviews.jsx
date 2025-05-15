import FormTemplate from '../components/FormTemplate';

const Reviews = () => {
  return (
    <section className="page-section">
      <h2>Отзывы родителей</h2>
      <div className="reviews-grid">
        <div className="review-card">
          <h3>Мария Иванова</h3>
          <p>"Отличный центр! Ребенок с удовольствием ходит на занятия!"</p>
          <div className="review-date">15.08.2023</div>
        </div>
        {/* Место для других отзывов */}
      </div>
      <FormTemplate
        title="Оставить отзыв"
        fields={['Имя', 'почта', 'текст']}
        textareaField="review-text"
      />
    </section>
  );
};

export default Reviews;