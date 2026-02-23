
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    // Bei HashRouter fängt der Pfad oft mit / an, wir prüfen ob er exakt übereinstimmt
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-12 py-6 md:py-12 flex justify-between items-start bg-transparent">
      {/* Studio Name Links */}
      <Link to="/" className="group flex flex-col items-start">
        <span className="text-base md:text-2xl font-bold tracking-[0.1em] uppercase leading-none text-white">
          Studio
        </span>
        <span className="text-base md:text-2xl font-light tracking-[0.1em] uppercase leading-none text-white/60 group-hover:text-white transition-colors duration-500">
          Kössendrup
        </span>
      </Link>

      {/* Navigation Rechts */}
      <nav className="flex items-center space-x-4 md:space-x-12 mt-1">
        {navItems.map((item) => (
          <Link 
            key={item.name}
            to={item.path} 
            className={`
              text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium transition-all duration-500
              ${isActive(item.path) 
                ? 'text-white border-b border-white/40 pb-0.5' 
                : 'text-white/30 hover:text-white'}
            `}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
