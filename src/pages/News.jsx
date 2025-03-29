import FormTemplate from '../components/FormTemplate';

const News = () => {
  return (
    <section className="page-section">
      <h2>Новости и события</h2>
      <div className="news-articles">
        <article className="news-card">
          <h3>Новый курс рисования!</h3>
          <p>С 1 сентября запускаем курс акварельной живописи для детей от 5 лет</p>
          <div className="news-meta">
            <span className="news-date">25.08.2023</span>
            <span className="comments-count">5 комментариев</span>
          </div>
        </article>
        {/* Другие новости */}
      </div>
      <FormTemplate
        title="Комментировать новость"
        fields={['name', 'email', 'comment']}
        textareaField="comment"
      />
    </section>
  );
};

export default News;