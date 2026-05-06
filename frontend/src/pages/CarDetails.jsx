import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Shield, ChevronLeft } from 'lucide-react';

export default function CarDetails() {
  const { id } = useParams();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('specs');
  
  const [downPayment, setDownPayment] = useState(0);
  const [term, setTerm] = useState(36);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`http://127.0.0.1:8000/api/cars/${id}/`)
      .then(response => response.json())
      .then(data => {
        setCar(data);
        setDownPayment(data.price * 0.2);
        setLoading(false);
      })
      .catch(error => {
        console.error("Ошибка получения авто:", error);
        setLoading(false);
      });
  }, [id]);

  const calculateCredit = () => {
    if (!car) return 0;
    const loanAmount = car.price - downPayment;
    const monthlyRate = 0.12 / 12;
    if (loanAmount <= 0) return 0;
    const payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    return Math.round(payment).toLocaleString('ru-RU');
  };

  const handleCreditSubmit = async () => {
    const formData = {
      client_name: "Клиент с сайта (Кредит)", 
      phone: "Не указан",
      type: "Заявка на кредит",
      car_interest: car.name,
      status: "Новая"
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/requests/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) alert('Заявка на кредит успешно отправлена в салон!');
      else alert('Ошибка при отправке данных.');
    } catch (error) {
      alert('Ошибка соединения с сервером.');
    }
  };

  const handleTradeInSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      client_name: "Оценка авто: " + e.target[0].value + " (" + e.target[1].value + " г.в.)", 
      phone: e.target[2].value, 
      type: "Trade-in",
      car_interest: car.name, 
      status: "Новая"
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/requests/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Заявка на Trade-in успешно отправлена!');
        e.target.reset();
      } else {
        alert('Ошибка при отправке данных.');
      }
    } catch (error) {
      alert('Ошибка соединения с сервером.');
    }
  };

  if (loading) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}><h2>Загрузка данных об автомобиле...</h2></div>;
  if (!car || !car.name) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}><h2>Автомобиль не найден :(</h2><Link to="/catalog">Вернуться в каталог</Link></div>;

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
            <div className="quick-spec-item"><span className="spec-label">Двигатель</span><span className="spec-value">{car.engine}</span></div>
            <div className="quick-spec-item"><span className="spec-label">Мощность</span><span className="spec-value">{car.hp}</span></div>
            <div className="quick-spec-item"><span className="spec-label">Привод</span><span className="spec-value">{car.drive}</span></div>
          </div>

          <button className="btn-primary large" style={{width: '100%', marginBottom: '12px'}} onClick={() => alert("Для записи на тест-драйв воспользуйтесь кнопкой 'Заказать звонок' в шапке сайта")}>
            Записаться на тест-драйв
          </button>
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
                <button className="btn-primary" style={{marginTop: '20px'}} onClick={handleCreditSubmit}>Отправить заявку на кредит</button>
              </div>
            </div>
          )}

          {activeTab === 'tradein' && (
            <div className="tradein-form">
              <h3>Оцените свой автомобиль онлайн</h3>
              <p>Получите дополнительную скидку до 200 000 ₽ при сдаче старого авто в Trade-in.</p>
              
              <form className="modal-form" onSubmit={handleTradeInSubmit} style={{maxWidth: '500px', marginTop: '20px'}}>
                <input type="text" placeholder="Марка и модель (напр. Ford Focus)" required />
                <input type="number" placeholder="Год выпуска" required min="1990" max="2024" />
                <input type="text" placeholder="Ваш телефон для связи" required />
                <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>Узнать стоимость</button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}