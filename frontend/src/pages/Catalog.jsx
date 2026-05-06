import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const BODY_TYPES = ['Все', 'Кроссовер', 'Внедорожник', 'Пикап', 'Электро', 'Лифтбек'];

export default function Catalog() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Все');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cars/')
      .then(response => response.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Ошибка при получении данных:", error);
        setLoading(false);
      });
  }, []);

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Все' || car.type === selectedType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}><h2>Загрузка автомобилей из базы данных...</h2></div>;
  }

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
                      {/* Используем priceText из базы данных */}
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