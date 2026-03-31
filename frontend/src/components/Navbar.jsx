import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react'; // Добавили иконки

export default function Navbar({ onOpenModal, onOpenAuth, user, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">FORD</span>
          <span className="logo-sub">DEALERSHIP</span>
        </Link>
        <nav className="nav-links">
          <Link to="/">Главная</Link>
          <Link to="/catalog">Модельный ряд</Link>
        </nav>
        
        <div className="nav-actions">
          <span className="phone hidden-mobile">8 (800) 555-35-35</span>
          
          {user ? (
            <div className="user-menu" style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
              <Link to="/profile" className="btn-outline" style={{padding: '8px 12px', display: 'flex', gap: '8px', alignItems: 'center'}}>
                <User size={18} /> {user.name}
              </Link>
              <button onClick={onLogout} className="icon-btn text-red" title="Выйти">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button className="btn-outline hidden-mobile" onClick={onOpenAuth}>Войти</button>
          )}

          <button className="btn-primary" onClick={onOpenModal}>Заказать звонок</button>
        </div>
      </div>
    </header>
  );
}