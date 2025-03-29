import { forwardRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = forwardRef(({ isOpen, onClose }, ref) => {
  const location = useLocation();

  useEffect(() => {}, [location, onClose]);

  return (
    <>
      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      ></div>
      <nav ref={ref} className={`main-nav ${isOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={onClose}>
              Главная
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={onClose}>
              О нас
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={onClose}>
              Услуги
            </Link>
          </li>
          <li>
            <Link to="/programs" onClick={onClose}>
              Программы
            </Link>
          </li>
          <li>
            <Link to="/schedule" onClick={onClose}>
              Расписание
            </Link>
          </li>
          <li>
            <Link to="/reviews" onClick={onClose}>
              Отзывы
            </Link>
          </li>
          <li>
            <Link to="/news" onClick={onClose}>
              Новости
            </Link>
          </li>
          <li>
            <Link to="/contacts" onClick={onClose}>
              Контакты
            </Link>
          </li>
          <li>
            <Link to="/auth" onClick={onClose}>
              Вход
            </Link>
          </li>
          <li>
            <Link to="/cabinet" onClick={onClose}>
              Кабинет
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
});

export default Navigation;
