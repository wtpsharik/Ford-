import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Shield, ChevronLeft } from 'lucide-react';

const CARS_DB = [
  { id: 1, name: 'Ford Bronco Sport', type: 'Внедорожник', price: 3450000, priceText: '3 450 000 ₽', engine: '1.5L EcoBoost', hp: '181 л.с.', transmission: '8-АКПП', drive: 'Полный (4WD)', status: 'В наличии', image: 'https://images.unsplash.com/photo-1620882814836-98ecfb8fb5ce?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, name: 'Ford Explorer', type: 'Кроссовер', price: 4800000, priceText: '4 800 000 ₽', engine: '2.3L EcoBoost', hp: '300 л.с.', transmission: '10-АКПП', drive: 'Полный (AWD)', status: 'В наличии', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, name: 'Ford F-150 Raptor', type: 'Пикап', price: 8900000, priceText: '8 900 000 ₽', engine: '3.5L V6', hp: '450 л.с.', transmission: '10-АКПП', drive: 'Полный (4WD)', status: 'Под заказ', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, name: 'Mustang Mach-E', type: 'Электро', price: 5200000, priceText: '5 200 000 ₽', engine: 'Электродвигатель', hp: '266 л.с.', transmission: 'Редуктор', drive: 'Полный (AWD)', status: 'В наличии', image: 'https://images.unsplash.com/photo-1642878235214-7407077fb571?q=80&w=1200&auto=format&fit=crop' },
  { id: 5, name: 'Ford Kuga', type: 'Кроссовер', price: 3100000, priceText: '3 100 000 ₽', engine: '2.0L', hp: '190 л.с.', transmission: '8-АКПП', drive: 'Передний', status: 'В наличии', image: 'https://images.unsplash.com/photo-1582467029213-ce71667c2e28?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, name: 'Ford Ranger', type: 'Пикап', price: 4100000, priceText: '4 100 000 ₽', engine: '2.0L', hp: '213 л.с.', transmission: '10-АКПП', drive: 'Полный (4WD)', status: 'В наличии', image: 'https://images.unsplash.com/photo-1612166683838-892ce3b8602b?q=80&w=1200&auto=format&fit=crop' }
];

export default function CarDetails() {
  const { id } = useParams();
  const car = CARS_DB.find(c => c.id === parseInt(id)) || CARS_DB[0];
  
  const [activeTab, setActiveTab] = useState('specs');
  const [downPayment, setDownPayment] = useState(car.price * 0.2);
  const [term, setTerm] = useState(36);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const calculateCredit = () => {
    const loanAmount = car.price - downPayment;
    const monthlyRate = 0.12 / 12;
    if (loanAmount <= 0) return 0;
    const payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    return Math.round(payment).toLocaleString('ru-RU');
  };

  return (
    <div className="container" style={{ padding: '40px 24px', minHeight: '80vh' }}>
      <Link to="/catalog" className="back-link">
        <ChevronLeft size={20} /> Вернуться в каталог
      </Link>

      <div className="car-details-layout">
        <div className="car-details-gallery">
          <img src={car.image} alt={car.name} className="main-car-image" />
        </div>

        <div className="car-details-info">
          <div className="car-status-badge"><Check size={14} /> {car.status}</div>
          <h1 className="car-details-title">{car.name}</h1>
          <p className="car-details-price">{car.priceText}</p>
          
          <div className="car-quick-specs">
            <div className="quick-spec-item">
              <span className="spec-label">Двигатель</span><span className="spec-value">{car.engine}</span>
            </div>
            <div className="quick-spec-item">
              <span className="spec-label">Мощность</span><span className="spec-value">{car.hp}</span>
            </div>
            <div className="quick-spec-item">
              <span className="spec-label">Привод</span><span className="spec-value">{car.drive}</span>
            </div>
          </div>

          <button className="btn-primary large" style={{width: '100%', marginBottom: '12px'}}>Записаться на тест-драйв</button>
          <p className="warranty-info"><Shield size={16} /> Гарантия 3 года или 100 000 км</p>
        </div>
      </div>

      <div className="tabs-section">
        <div className="tabs-header">
          <button className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')}>Характеристики</button>
          <button className={`tab-btn ${activeTab === 'credit' ? 'active' : ''}`} onClick={() => setActiveTab('credit')}>Кредит</button>
          <button className={`tab-btn ${activeTab === 'tradein' ? 'active' : ''}`} onClick={() => setActiveTab('tradein')}>Trade-in</button>
        </div>

        <div className="tab-content">
          {activeTab === 'specs' && (
            <div className="specs-grid">
              <div className="spec-row"><span>Тип кузова</span><strong>{car.type}</strong></div>
              <div className="spec-row"><span>Трансмиссия</span><strong>{car.transmission}</strong></div>
              <div className="spec-row"><span>Двигатель</span><strong>{car.engine}</strong></div>
              <div className="spec-row"><span>Мощность</span><strong>{car.hp}</strong></div>
              <div className="spec-row"><span>Привод</span><strong>{car.drive}</strong></div>
            </div>
          )}

          {activeTab === 'credit' && (
            <div className="credit-calculator">
              <div className="calc-controls">
                <div className="calc-group">
                  <label>Первоначальный взнос (₽): {downPayment.toLocaleString('ru-RU')}</label>
                  <input type="range" min="0" max={car.price} step="50000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
                </div>
                <div className="calc-group">
                  <label>Срок кредита: {term} мес.</label>
                  <input type="range" min="12" max="84" step="12" value={term} onChange={(e) => setTerm(Number(e.target.value))} />
                </div>
              </div>
              <div className="calc-result">
                <h3>Ежемесячный платеж:</h3>
                <div className="payment-amount">{calculateCredit()} ₽ / мес</div>
                <p>Ставка: от 12% годовых. Данный расчет является предварительным.</p>
                <button className="btn-primary" style={{marginTop: '20px'}}>Отправить заявку на кредит</button>
              </div>
            </div>
          )}

          {activeTab === 'tradein' && (
            <div className="tradein-form">
              <h3>Оцените свой автомобиль онлайн</h3>
              <p>Получите скидку до 200 000 ₽ при сдаче старого авто в Trade-in.</p>
              <form className="modal-form" style={{maxWidth: '500px', marginTop: '20px'}}>
                <input type="text" placeholder="Марка и модель (напр. Kia Rio)" required />
                <input type="number" placeholder="Год выпуска" required min="1990" max="2024" />
                <input type="text" placeholder="Ваш телефон для связи" required />
                <button type="submit" className="btn-primary" onClick={(e) => {e.preventDefault(); alert('Заявка отправлена!');}}>Узнать стоимость</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}