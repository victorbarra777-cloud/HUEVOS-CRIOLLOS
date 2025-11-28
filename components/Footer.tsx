import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Granja El Amanecer</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dedicados a la producción sostenible de huevos criollos de la más alta calidad. 
              Cuidamos nuestras gallinas para cuidar de tu familia.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-farm-yellow">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-farm-orange" />
                Vereda La Esperanza, Km 5, Colombia
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-farm-orange" />
                +57 300 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-farm-orange" />
                contacto@granjaamanecer.com
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-farm-yellow">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Granja El Amanecer. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;