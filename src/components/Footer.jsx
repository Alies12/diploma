const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="contact-info">
            <h3>Контакты</h3>
            <p>Телефон: +7 (999) 123-45-67</p>
            <p>Email: info@sunny-center.ru</p>
          </div>
          <div className="social-links">
            <h3>Мы в соцсетях</h3>
            <a href="/">VKontakte</a>
            <a href="/">Telegram</a>
            <a href="/">WhatsApp</a>
          </div>
          <div className="copyright">
            <p>© 2023 Детский Центр "Солнышко"</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;