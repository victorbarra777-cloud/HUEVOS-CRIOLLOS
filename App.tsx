import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import RecipeGenerator from './components/RecipeGenerator';
import Footer from './components/Footer';
import { MOCK_PRODUCTS } from './constants';
import { Product, CartItem, ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Simple cart persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <Hero onShopNow={() => setCurrentView(ViewState.SHOP)} />
            <div className="py-8 bg-farm-cream/90 backdrop-blur-sm text-center">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">¿Por qué elegirnos?</h2>
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-white/95 rounded-xl shadow-sm">
                  <span className="text-4xl mb-4 block">🌿</span>
                  <h3 className="font-bold text-lg mb-2">100% Orgánicos</h3>
                  <p className="text-gray-600 text-sm">Sin químicos ni procesos industriales. Solo naturaleza.</p>
                </div>
                <div className="p-6 bg-white/95 rounded-xl shadow-sm">
                  <span className="text-4xl mb-4 block">🐔</span>
                  <h3 className="font-bold text-lg mb-2">Gallinas Felices</h3>
                  <p className="text-gray-600 text-sm">Pastoreo libre todos los días. Bienestar animal garantizado.</p>
                </div>
                <div className="p-6 bg-white/95 rounded-xl shadow-sm">
                  <span className="text-4xl mb-4 block">🚚</span>
                  <h3 className="font-bold text-lg mb-2">Frescura Local</h3>
                  <p className="text-gray-600 text-sm">De la granja a tu mesa en menos de 24 horas.</p>
                </div>
              </div>
            </div>
            <ProductList products={MOCK_PRODUCTS.slice(0, 3)} onAddToCart={addToCart} />
            <RecipeGenerator />
          </>
        );
      case ViewState.SHOP:
        return <ProductList products={MOCK_PRODUCTS} onAddToCart={addToCart} />;
      case ViewState.RECIPES:
        return <RecipeGenerator />;
      case ViewState.ABOUT:
        return (
          <div className="bg-white/90 backdrop-blur-sm min-h-[60vh]">
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
               <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Nuestra Historia</h2>
               <img src="https://picsum.photos/seed/farmview/800/400" alt="Farm" className="w-full h-64 object-cover rounded-2xl mb-8 shadow-lg" />
               <div className="prose prose-lg mx-auto text-gray-600">
                 <p className="mb-4">
                   Granja El Amanecer nació en 2010 con un sueño simple: recuperar el sabor verdadero del huevo de campo.
                   Ubicados en las verdes montañas de la región, nuestras gallinas disfrutan de aire puro, agua de manantial
                   y una dieta balanceada basada en maíz y verduras orgánicas.
                 </p>
                 <p>
                   Creemos que la agricultura sostenible no es una moda, sino una responsabilidad. Por eso, 
                   implementamos sistemas de compostaje, energía solar y recolección de agua de lluvia en nuestras instalaciones.
                 </p>
                 <p className="mt-8 font-serif italic text-farm-green font-bold">
                   "Cuidamos la tierra, y ella nos devuelve alimentos llenos de vida."
                 </p>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image of Chicken Farm */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Overlay to ensure text readability */}
      <div className="fixed inset-0 z-0 bg-farm-cream/30 mix-blend-multiply pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          onOpenCart={() => setIsCartOpen(true)}
          currentView={currentView}
          onChangeView={setCurrentView}
        />
        
        <main className="flex-grow">
          {renderContent()}
        </main>

        <Footer />
        
        <CartSidebar 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
        />
      </div>
    </div>
  );
};

export default App;