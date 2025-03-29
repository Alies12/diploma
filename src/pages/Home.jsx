const Home = () => {
    return (
      <section className="page-section">
        <div className="hero-banner">
          <h2>Добро пожаловать в наш детский центр!</h2>
          <p>Развиваем таланты с любовью и заботой</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <h3>🎨 Творческие занятия</h3>
            <p>Развиваем креативное мышление через искусство</p>
          </div>
          <div className="feature-card">
            <h3>📚 Подготовка к школе</h3>
            <p>Комплексная программа для будущих первоклассников</p>
          </div>
          <div className="feature-card">
            <h3>🤸 Развивающие игры</h3>
            <p>Обучение через игровую деятельность</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Home;