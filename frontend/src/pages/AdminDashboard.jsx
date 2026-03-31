import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Car, ClipboardList, MessageSquare, LogOut, Search, Plus, Edit, Trash2 } from 'lucide-react';

const INITIAL_REQUESTS = [
  { id: 'REQ-001', date: '2024-05-20', client: 'Иван Иванов', phone: '+7 (999) 123-45-67', type: 'Тест-драйв', car: 'Ford Bronco Sport', status: 'Новая' },
  { id: 'REQ-002', date: '2024-05-20', client: 'Анна Смирнова', phone: '+7 (900) 000-11-22', type: 'Кредит', car: 'Ford Explorer', status: 'В работе' },
  { id: 'REQ-003', date: '2024-05-19', client: 'Петр Петров', phone: '+7 (911) 222-33-44', type: 'Trade-in', car: 'Ford Kuga', status: 'Одобрена' },
];

const ADMIN_CARS = [
  { id: 1, name: 'Ford Bronco Sport', vin: '1FMCU9GX8MUXXXXXX', price: '3 450 000', stock: 5, status: 'Активен' },
  { id: 2, name: 'Ford Explorer', vin: '1FMEU7BP8MUXXXXXX', price: '4 800 000', stock: 2, status: 'Активен' },
  { id: 3, name: 'Ford F-150 Raptor', vin: '1FTFW1RG4MFXXXXXX', price: '8 900 000', stock: 0, status: 'Под заказ' },
];

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('requests');
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [cars, setCars] = useState(ADMIN_CARS);

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Новая': return 'status-new';
      case 'В работе': return 'status-progress';
      case 'Одобрена': case 'Активен': return 'status-success';
      case 'Отклонена': case 'Под заказ': return 'status-error';
      default: return '';
    }
  };


  const renderStats = () => (
    <div className="admin-stats-grid">
      <div className="stat-card">
        <h3>Новых заявок</h3>
        <div className="stat-value text-blue">12</div>
        <p>За последние 7 дней</p>
      </div>
      <div className="stat-card">
        <h3>Авто в наличии</h3>
        <div className="stat-value text-green">24</div>
        <p>Общая стоимость: ~85 млн ₽</p>
      </div>
      <div className="stat-card">
        <h3>Продано за месяц</h3>
        <div className="stat-value">8</div>
        <p>+2 по сравнению с прошлым мес.</p>
      </div>
    </div>
  );

  const renderRequests = () => (
    <>
      <div className="admin-toolbar">
        <div className="search-input-wrapper" style={{width: '300px'}}>
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Поиск заявки..." className="filter-input" />
        </div>
      </div>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Дата</th><th>Клиент</th><th>Тип</th><th>Автомобиль</th><th>Статус</th><th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td><strong>{req.id}</strong></td>
                <td>{req.date}</td>
                <td><div className="client-name">{req.client}</div><div className="client-phone">{req.phone}</div></td>
                <td>{req.type}</td>
                <td>{req.car}</td>
                <td><span className={`status-badge ${getStatusColor(req.status)}`}>{req.status}</span></td>
                <td>
                  <select className="status-select" value={req.status} onChange={(e) => handleStatusChange(req.id, e.target.value)}>
                    <option value="Новая">Новая</option>
                    <option value="В работе">В работе</option>
                    <option value="Одобрена">Одобрена</option>
                    <option value="Отклонена">Отклонена</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderCatalog = () => (
    <>
      <div className="admin-toolbar">
        <div className="search-input-wrapper" style={{width: '300px'}}>
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Поиск по VIN или названию..." className="filter-input" />
        </div>
        <button className="btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <Plus size={18} /> Добавить авто
        </button>
      </div>
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Модель</th><th>VIN код</th><th>Цена (₽)</th><th>На складе</th><th>Статус</th><th>Управление</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td><strong>{car.name}</strong></td>
                <td style={{fontFamily: 'monospace', color: '#6b7280'}}>{car.vin}</td>
                <td>{car.price}</td>
                <td>{car.stock} шт.</td>
                <td><span className={`status-badge ${getStatusColor(car.status)}`}>{car.status}</span></td>
                <td>
                  <div style={{display: 'flex', gap: '12px'}}>
                    <button className="icon-btn text-blue" title="Редактировать"><Edit size={18} /></button>
                    <button className="icon-btn text-red" title="Удалить"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="logo-text" style={{color: 'white'}}>FORD</span>
          <span className="logo-sub" style={{color: '#9ca3af', fontSize: '10px'}}>CRM SYSTEM</span>
        </div>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveMenu('dashboard')}><LayoutDashboard size={20} /> Дашборд</button>
          <button className={`admin-nav-item ${activeMenu === 'requests' ? 'active' : ''}`} onClick={() => setActiveMenu('requests')}><ClipboardList size={20} /> Заявки <span className="badge-count">1</span></button>
          <button className={`admin-nav-item ${activeMenu === 'cars' ? 'active' : ''}`} onClick={() => setActiveMenu('cars')}><Car size={20} /> Каталог авто</button>
          <button className={`admin-nav-item ${activeMenu === 'chat' ? 'active' : ''}`} onClick={() => setActiveMenu('chat')}><MessageSquare size={20} /> Чаты</button>
        </nav>
        <div className="admin-logout">
          <Link to="/" className="admin-nav-item text-red"><LogOut size={20} /> Выйти на сайт</Link>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h2>
            {activeMenu === 'dashboard' && 'Сводная статистика'}
            {activeMenu === 'requests' && 'Управление заявками'}
            {activeMenu === 'cars' && 'Управление каталогом'}
            {activeMenu === 'chat' && 'Чаты с клиентами'}
          </h2>
          <div className="admin-user-info">
            <span>Менеджер: Александр</span><div className="avatar">А</div>
          </div>
        </header>

        <div className="admin-content">
          {activeMenu === 'dashboard' && renderStats()}
          {activeMenu === 'requests' && renderRequests()}
          {activeMenu === 'cars' && renderCatalog()}
          {activeMenu === 'chat' && <div className="no-results">Интерфейс чатов в разработке (подключение WebSockets)</div>}
        </div>
      </main>
    </div>
  );
}