import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { X } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CarDetails from './pages/CarDetails';
import AdminDashboard from './pages/AdminDashboard';
import ClientProfile from './pages/ClientProfile'; 
import './App.css';

function App() {
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: 'Иван Иванов', email: 'ivan.ivanov@example.com' });
    setIsAuthModalOpen(false);
  };

  const ClientLayout = ({ children }) => (
    <>
      <Navbar 
        onOpenModal={() => setIsCallbackModalOpen(true)} 
        onOpenAuth={() => setIsAuthModalOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
      />
      {children}
      <Footer />
    </>
  );

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<ClientLayout><Home onOpenModal={() => setIsCallbackModalOpen(true)} /></ClientLayout>} />
        <Route path="/catalog" element={<ClientLayout><Catalog /></ClientLayout>} />
        <Route path="/car/:id" element={<ClientLayout><CarDetails /></ClientLayout>} />
        
        <Route path="/profile" element={<ClientLayout><ClientProfile user={user} /></ClientLayout>} />

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {isCallbackModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCallbackModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsCallbackModalOpen(false)}><X size={24} /></button>
            <h2>Заказать звонок</h2>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setIsCallbackModalOpen(false); alert('Заявка отправлена!'); }}>
              <input type="text" placeholder="Ваше имя" required />
              <input type="tel" placeholder="Телефон" required />
              <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>Отправить</button>
            </form>
          </div>
        </div>
      )}

      {isAuthModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsAuthModalOpen(false)}><X size={24} /></button>
            <h2>Вход в кабинет</h2>
            <p>Для отслеживания статуса заявок</p>
            <form className="modal-form" onSubmit={handleLogin} style={{marginTop: '20px'}}>
              <input type="email" placeholder="E-mail (введите любой)" required />
              <input type="password" placeholder="Пароль (любой)" required />
              <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>Войти</button>
            </form>
            <p style={{textAlign: 'center', marginTop: '16px', fontSize: '14px'}}>
              Нет аккаунта? <a href="#" style={{color: 'var(--ford-blue)'}}>Зарегистрироваться</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;