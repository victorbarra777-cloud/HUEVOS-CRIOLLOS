import React from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Prevent scrolling when cart is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full transform transition-transform duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-100 bg-farm-cream/30">
            <h2 className="text-lg font-serif font-medium text-gray-900">Tu Canasta de Compras</h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Cerrar panel</span>
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingBagIcon size={40} className="text-gray-400" />
                </div>
                <p className="text-lg font-medium">Tu canasta está vacía</p>
                <p className="text-sm text-center max-w-xs">¡Agrega algunos de nuestros deliciosos huevos criollos para comenzar!</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-farm-orange font-medium hover:text-orange-700"
                >
                  Volver a la tienda
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                  <li key={item.id} className="py-6 flex">
                    <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 font-medium text-gray-900">{item.quantity}</span>
                          <button 
                             onClick={() => onUpdateQuantity(item.id, 1)}
                             className="p-1 text-gray-600 hover:bg-gray-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer / Checkout */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${subtotal.toLocaleString('es-CO')}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 mb-6">
                El envío e impuestos se calculan en el siguiente paso.
              </p>
              <button
                className="w-full flex items-center justify-center rounded-md border border-transparent bg-farm-green px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 transition-colors"
                onClick={() => alert('¡Gracias por tu compra! (Modo Demo)')}
              >
                Checkout <ArrowRight size={20} className="ml-2" />
              </button>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  o{' '}
                  <button
                    type="button"
                    className="font-medium text-farm-green hover:text-green-800"
                    onClick={onClose}
                  >
                    Continuar Comprando
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ShoppingBagIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

export default CartSidebar;