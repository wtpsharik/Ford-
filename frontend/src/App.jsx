import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { X, CheckCircle } from 'lucide-react';
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
  const [authMode, setAuthMode] = useState('login');
  
  const [user, setUser] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('ford_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        const userData = { name: data.name, email: data.email, token: data.token };
        setUser(userData);
        localStorage.setItem('ford_user', JSON.stringify(userData));
        setIsAuthModalOpen(false);
        alert('Регистрация прошла успешно!');
      } else {
        alert(data.error || "Ошибка регистрации");
      }
    } catch (error) {
      alert("Ошибка сети. Сервер недоступен.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target[0].value,
      password: e.target[1].value
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        const userData = { name: data.name, email: data.email, token: data.token };
        setUser(userData);
        localStorage.setItem('ford_user', JSON.stringify(userData));
        setIsAuthModalOpen(false);
      } else {
        alert(data.error || "Неверный логин или пароль");
      }
    } catch (error) {
      alert("Ошибка сети. Сервер недоступен.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ford_user');
  };

  const handleCallRequest = async (e) => {
    e.preventDefault();
    const formData = {
      client_name: e.target[0].value,
      phone: e.target[1].value,
      type: 'Заказ звонка',
      status: 'Новая'
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/api/requests/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsCallbackModalOpen(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else alert("Ошибка при отправке на сервер!");
    } catch (error) { alert("Сервер недоступен."); }
  };

  const ClientLayout = ({ children }) => (
    <>
      <Navbar 
        onOpenModal={() => setIsCallbackModalOpen(true)} 
        onOpenAuth={() => { setIsAuthModalOpen(true); setAuthMode('login'); }}
        user={user}
        onLogout={handleLogout}
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
            <h2>Заказать звонок / Тест-драйв</h2>
            <form className="modal-form" onSubmit={handleCallRequest}>
              <input type="text" placeholder="Ваше имя" required />
              <input type="tel" placeholder="Телефон" required />
              <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>Отправить заявку</button>
            </form>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="success-toast" style={{
          position: 'fixed', bottom: '40px', right: '40px', backgroundColor: '#10b981', color: 'white',
          padding: '16px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px',
          boxShadow: '0 10px 15px rgba(0,0,0,0.1)', zIndex: 9999, animation: 'slideUp 0.3s ease'
        }}>
          <CheckCircle size={24} />
          <div><strong>Успешно!</strong><div style={{fontSize: '14px'}}>Ваша заявка отправлена.</div></div>
        </div>
      )}

      {isAuthModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsAuthModalOpen(false)}><X size={24} /></button>
            
            {authMode === 'login' ? (
              <>
                <h2>Вход в кабинет</h2>
                <form className="modal-form" onSubmit={handleLogin} style={{marginTop: '20px'}}>
                  <input type="email" placeholder="E-mail" required />
                  <input type="password" placeholder="Пароль" required />
                  <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>Войти</button>
                </form>
                <p style={{textAlign: 'center', marginTop: '16px', fontSize: '14px'}}>
                  Нет аккаунта? <span style={{color: 'var(--ford-blue)', cursor: 'pointer', fontWeight: 'bold'}} onClick={() => setAuthMode('register')}>Зарегистрироваться</span>
                </p>
              </>
            ) : (
              <>
                <h2>Регистрация</h2>
                <form className="modal-form" onSubmit={handleRegister} style={{marginTop: '20px'}}>
                  <input type="text" placeholder="Как вас зовут?" required />
                  <input type="email" placeholder="E-mail" required />
                  <input type="password" placeholder="Придумайте пароль" required minLength="6" />
                  <button type="submit" className="btn-primary" style={{marginTop: '10px'}}>Создать аккаунт</button>
                </form>
                <p style={{textAlign: 'center', marginTop: '16px', fontSize: '14px'}}>
                  Уже есть аккаунт? <span style={{color: 'var(--ford-blue)', cursor: 'pointer', fontWeight: 'bold'}} onClick={() => setAuthMode('login')}>Войти</span>
                </p>
              </>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}

export default App;