import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Car, ClipboardList, MessageSquare, LogOut, Search, Edit, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('requests');
  
  const [requests, setRequests] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const reqResponse = await fetch('http://127.0.0.1:8000/api/requests/');
      const reqData = await reqResponse.json();
      const carsResponse = await fetch('http://127.0.0.1:8000/api/cars/');
      const carsData = await carsResponse.json();
      
      setRequests(reqData.reverse());
      setCars(carsData);
    } catch (error) {
      console.error("Ошибка загрузки данных из БД:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/requests/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
      } else {
        alert("Ошибка при обновлении статуса в БД");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Новая': return 'status-new';
      case 'В работе': return 'status-progress';
      case 'Одобрена': return 'status-success';
      case 'Отклонена': return 'status-error';
      default: return '';
    }
  };

  if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>Загрузка CRM системы...</div>;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="logo-text" style={{color: 'white'}}>FORD</span>
          <span className="logo-sub" style={{color: '#9ca3af', fontSize: '10px'}}>CRM SYSTEM</span>
        </div>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveMenu('dashboard')}><LayoutDashboard size={20} /> Сводка</button>
          <button className={`admin-nav-item ${activeMenu === 'requests' ? 'active' : ''}`} onClick={() => setActiveMenu('requests')}>
            <ClipboardList size={20} /> Заявки 
            <span className="badge-count">{requests.filter(r => r.status === 'Новая').length}</span>
          </button>
          <button className={`admin-nav-item ${activeMenu === 'cars' ? 'active' : ''}`} onClick={() => setActiveMenu('cars')}><Car size={20} /> Склад авто</button>
        </nav>
        <div className="admin-logout">
          <Link to="/" className="admin-nav-item text-red"><LogOut size={20} /> Выйти на сайт</Link>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h2>Панель администратора</h2>
        </header>

        <div className="admin-content">
          {activeMenu === 'requests' && (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr><th>ID</th><th>Дата</th><th>Клиент</th><th>Услуга</th><th>Интерес</th><th>Статус</th><th>Действие</th></tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id}>
                      <td>{req.id}</td>
                      <td>{new Date(req.created_at).toLocaleDateString('ru-RU')}</td>
                      <td><div className="client-name">{req.client_name}</div><div className="client-phone">{req.phone}</div></td>
                      <td>{req.type}</td>
                      <td>{req.car_interest || '-'}</td>
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
          )}

=          {activeMenu === 'cars' && (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr><th>ID</th><th>Модель</th><th>Кузов</th><th>Цена (₽)</th><th>Наличие</th><th>Управление</th></tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id}>
                      <td>{car.id}</td>
                      <td><strong>{car.name}</strong></td>
                      <td>{car.type}</td>
                      <td>{car.price.toLocaleString('ru-RU')}</td>
                      <td><span className={`status-badge ${getStatusColor(car.status)}`}>{car.status}</span></td>
                      <td>
                        <button className="icon-btn text-blue" title="Перейти в Django Admin" onClick={() => window.open('http://127.0.0.1:8000/admin/api/car/', '_blank')}>
                          <Edit size={18} /> Изменить в БД
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeMenu === 'dashboard' && <h2>Сводная статистика (всего авто: {cars.length}, всего заявок: {requests.length})</h2>}
        </div>
      </main>
    </div>
  );
}