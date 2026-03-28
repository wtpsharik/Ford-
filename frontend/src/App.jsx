import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Ford Dealership</h1>
        <nav>
          <a href="#">Главная</a>
          <a href="#">Модельный ряд</a>
          <a href="#">Контакты</a>
        </nav>
      </header>
      
      <main className="main-content">
        <h2>Добро пожаловать в официальный дилерский центр</h2>
        <p>Здесь скоро будет красивый каталог автомобилей.</p>
      </main>
    </div>
  );
}

export default App;