import React from 'react';
import { Link } from 'react-router-dom';

const CARS_PREVIEW = [
  { id: 1, name: 'Ford Bronco Sport', type: 'Внедорожник', price: 'от 3 450 000 ₽', engine: '1.5L', hp: '181 л.с.', image: 'https://images.unsplash.com/photo-1620882814836-98ecfb8fb5ce?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Ford Explorer', type: 'Кроссовер', price: 'от 4 800 000 ₽', engine: '2.3L', hp: '300 л.с.', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop' },
];

export default function Home({ onOpenModal }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Новый Ford Mustang</h1>
          <p>Почувствуй мощь легенды. Запишись на тест-драйв уже сегодня.</p>
          <div className="hero-buttons">
            <Link to="/catalog" className="btn-primary large" style={{display: 'inline-block'}}>Каталог</Link>
            <button className="btn-outline large" onClick={onOpenModal}>Тест-драйв</button>
          </div>
        </div>
      </section>

      <section className="catalog">
        <div className="container">
          <div className="catalog-header">
            <h2>Популярные модели</h2>
            <Link to="/catalog" className="view-all">Смотреть все &rarr;</Link>
          </div>
          <div className="catalog-grid">
            {CARS_PREVIEW.map((car) => (
              <div key={car.id} className="car-card">
                <div className="car-image-wrapper">
                  <img src={car.image} alt={car.name} className="car-image" />
                  <span className="car-badge">{car.type}</span>
                </div>
                <div className="car-info">
                  <h3 className="car-name">{car.name}</h3>
                  <div className="car-footer">
                    <span className="car-price">{car.price}</span>
                    <Link to={`/car/${car.id}`} className="btn-secondary">Подробнее</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}