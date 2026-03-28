import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <span className="logo-text">FORD</span>
            <span className="logo-sub">DEALERSHIP</span>
          </div>
          
          <nav className="nav-links">
            <a href="#" className="active">Модельный ряд</a>
            <a href="#">Авто с пробегом</a>
            <a href="#">Сервис</a>
            <a href="#">О нас</a>
          </nav>

          <div className="nav-actions">
            <span className="phone">8 (800) 555-35-35</span>
            <button className="btn-primary">Заказать звонок</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Новый Ford Mustang</h1>
            <p>Почувствуй мощь легенды. Запишись на тест-драйв уже сегодня и получи специальное предложение.</p>
            <div className="hero-buttons">
              <button className="btn-primary large">Смотреть комплектации</button>
              <button className="btn-outline large">Тест-драйв</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;