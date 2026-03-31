import React from 'react';
import { Navigate } from 'react-router-dom';

const MY_REQUESTS = [
  { id: 'REQ-001', date: '20.05.2024', type: 'Тест-драйв', car: 'Ford Bronco Sport', status: 'Новая' },
  { id: 'REQ-002', date: '15.05.2024', type: 'Trade-in', car: 'Ford Focus 2018', status: 'Одобрена' },
];

export default function ClientProfile({ user }) {
  if (!user) {
    return <Navigate to="/" />;
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Новая': return 'status-new';
      case 'В работе': return 'status-progress';
      case 'Одобрена': return 'status-success';
      case 'Отклонена': return 'status-error';
      default: return '';
    }
  };

  return (
    <div className="container" style={{ padding: '60px 24px', minHeight: '80vh' }}>
      <h1 className="page-title">Личный кабинет</h1>
      
      <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '32px' }}>
        
        <div className="profile-card" style={{ backgroundColor: 'var(--bg-light)', padding: '24px', borderRadius: '12px', height: 'fit-content' }}>
          <div className="avatar" style={{ width: '64px', height: '64px', fontSize: '24px', marginBottom: '16px' }}>
            {user.name.charAt(0)}
          </div>
          <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>{user.name}</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '16px' }}>{user.email}</p>
          <button className="btn-outline" style={{ width: '100%' }}>Редактировать профиль</button>
        </div>

        <div className="profile-requests">
          <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Мои заявки</h2>
          
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Номер</th>
                  <th>Дата</th>
                  <th>Услуга</th>
                  <th>Автомобиль</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {MY_REQUESTS.map(req => (
                  <tr key={req.id}>
                    <td><strong>{req.id}</strong></td>
                    <td>{req.date}</td>
                    <td>{req.type}</td>
                    <td>{req.car}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}