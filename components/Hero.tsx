import React from 'react';
import { ViewState } from '../types';
import { ArrowRight, Star } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative bg-farm-cream/90 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-farm-cream/0 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-farm-cream transform translate-x-1/2 opacity-90"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-farm-green/10 text-farm-green text-sm font-semibold mb-4 border border-farm-green/20">
                <Star size={14} fill="currentColor" />
                <span>Calidad Premium Garantizada</span>
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-serif">
                <span className="block xl:inline">El sabor auténtico del</span>{' '}
                <span className="block text-farm-orange xl:inline">campo a tu mesa</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-medium">
                Nuestros huevos criollos provienen de gallinas felices, criadas en libertad y alimentadas naturalmente. Sin hormonas, sin antibióticos, solo frescura y nutrición pura.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={onShopNow}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-farm-orange hover:bg-orange-600 md:py-4 md:text-lg transition-all"
                  >
                    Comprar Ahora
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => { /* Scroll to features or info */ }}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-farm-orange bg-white/80 hover:bg-white md:py-4 md:text-lg transition-all shadow-sm"
                  >
                    Conocer Más
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1599587402099-a931a31d97df?q=80&w=1200&auto=format&fit=crop"
          alt="Gallina ponedora en la granja"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-farm-cream via-transparent to-transparent lg:via-farm-cream/40"></div>
      </div>
    </div>
  );
};

export default Hero;