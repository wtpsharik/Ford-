import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo footer-logo">
            <span className="logo-text" style={{color: 'white'}}>FORD</span>
            <span className="logo-sub" style={{color: '#9ca3af'}}>DEALERSHIP</span>
          </div>
          <p className="footer-desc">Официальный дилер Ford. Продажа, сервисное обслуживание и гарантийный ремонт.</p>
        </div>
        <div className="footer-contacts">
          <h4>Контакты</h4>
          <ul>
            <li><MapPin size={18} className="footer-icon" /> г. Москва, ул. Автомобильная, д. 1</li>
            <li><Phone size={18} className="footer-icon" /> 8 (800) 555-35-35</li>
            <li><Clock size={18} className="footer-icon" /> Ежедневно с 9:00 до 21:00</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}