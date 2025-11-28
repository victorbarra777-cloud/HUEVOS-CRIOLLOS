import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Star, Info } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 sm:text-4xl">Nuestros Productos</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Seleccionamos y empacamos cuidadosamente los mejores huevos del día para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 group-hover:opacity-95 transition-opacity h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-farm-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                    {product.badge}
                  </div>
                )}
              </div>
              
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <span className="text-xs text-gray-400 ml-2">(120+ reseñas)</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-2xl font-bold text-gray-900">
                    ${product.price.toLocaleString('es-CO')}
                  </p>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-farm-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-farm-green transition-colors"
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;