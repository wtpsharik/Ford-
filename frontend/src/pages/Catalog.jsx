import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const ALL_CARS = [
  { id: 1, name: 'Ford Bronco Sport', type: 'Внедорожник', price: 3450000, priceText: 'от 3 450 000 ₽', engine: '1.5L', hp: '181 л.с.', image: 'https://images.unsplash.com/photo-1620882814836-98ecfb8fb5ce?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Ford Explorer', type: 'Кроссовер', price: 4800000, priceText: 'от 4 800 000 ₽', engine: '2.3L', hp: '300 л.с.', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Ford F-150 Raptor', type: 'Пикап', price: 8900000, priceText: 'от 8 900 000 ₽', engine: '3.5L', hp: '450 л.с.', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Mustang Mach-E', type: 'Электро', price: 5200000, priceText: 'от 5 200 000 ₽', engine: 'Электро', hp: '266 л.с.', image: 'https://images.unsplash.com/photo-1642878235214-7407077fb571?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Ford Kuga', type: 'Кроссовер', price: 3100000, priceText: 'от 3 100 000 ₽', engine: '2.0L', hp: '190 л.с.', image: 'https://images.unsplash.com/photo-1582467029213-ce71667c2e28?q=80&w=800&auto=format&fit=crop' },
  { id: 6, name: 'Ford Ranger', type: 'Пикап', price: 4100000, priceText: 'от 4 100 000 ₽', engine: '2.0L', hp: '213 л.с.', image: 'https://images.unsplash.com/photo-1612166683838-892ce3b8602b?q=80&w=800&auto=format&fit=crop' }
];

const BODY_TYPES = ['Все', 'Кроссовер', 'Внедорожник', 'Пикап', 'Электро'];

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Все');

  const filteredCars = ALL_CARS.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Все' || car.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container" style={{ padding: '40px 24px', minHeight: '80vh' }}>
      <h1 className="page-title">Автомобили в наличии</h1>
      
      <div className="catalog-layout">
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h3>Поиск по модели</h3>
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Например, Explorer..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>

          <div className="filter-group">
            <h3>Тип кузова</h3>
            <div className="type-buttons">
              {BODY_TYPES.map(type => (
                <button 
                  key={type}
                  className={`type-btn ${selectedType === type ? 'active' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="catalog-content">
          <p className="results-count">Найдено автомобилей: {filteredCars.length}</p>
          
          {filteredCars.length > 0 ? (
            <div className="catalog-grid">
              {filteredCars.map((car) => (
                <div key={car.id} className="car-card">
                  <div className="car-image-wrapper">
                    <img src={car.image} alt={car.name} className="car-image" />
                    <span className="car-badge">{car.type}</span>
                  </div>
                  <div className="car-info">
                    <h3 className="car-name">{car.name}</h3>
                    <div className="car-specs">
                      <span>{car.engine}</span><span className="dot">•</span><span>{car.hp}</span>
                    </div>
                    <div className="car-footer">
                      <span className="car-price">{car.priceText}</span>
                      <Link to={`/car/${car.id}`} className="btn-secondary">Подробнее</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>По вашему запросу ничего не найдено</h3>
              <p>Попробуйте изменить параметры фильтрации.</p>
              <button className="btn-outline" onClick={() => {setSearchTerm(''); setSelectedType('Все');}} style={{color: 'var(--ford-blue)', borderColor: 'var(--ford-blue)', marginTop: '16px'}}>
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}