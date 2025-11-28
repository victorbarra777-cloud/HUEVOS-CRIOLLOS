import React from 'react';
import { ShoppingCart, Menu, Egg, X } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, currentView, onChangeView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Inicio', value: ViewState.HOME },
    { label: 'Tienda', value: ViewState.SHOP },
    { label: 'Chef IA', value: ViewState.RECIPES },
    { label: 'Sobre Nosotros', value: ViewState.ABOUT },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-farm-yellow/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer gap-2"
            onClick={() => onChangeView(ViewState.HOME)}
          >
            <div className="bg-farm-yellow p-2 rounded-full text-white">
              <Egg size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900 tracking-tight">Granja El Amanecer</h1>
              <p className="text-xs text-farm-green font-medium tracking-wide">HUEVOS 100% CRIOLLOS</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onChangeView(item.value)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentView === item.value 
                    ? 'text-farm-orange border-b-2 border-farm-orange' 
                    : 'text-gray-600 hover:text-farm-orange'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Cart & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-gray-600 hover:text-farm-orange transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onChangeView(item.value);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === item.value 
                    ? 'bg-farm-cream text-farm-orange' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;