import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Media Docena Criolla',
    description: '6 huevos frescos de campo, yema roja intensa y sabor inigualable.',
    price: 4500,
    image: 'https://picsum.photos/seed/eggbox1/400/400',
    category: 'media-docena',
    badge: 'Popular'
  },
  {
    id: '2',
    name: 'Docena Clásica',
    description: '12 huevos seleccionados a mano. Ideales para el desayuno familiar.',
    price: 8500,
    image: 'https://picsum.photos/seed/eggbox2/400/400',
    category: 'docena'
  },
  {
    id: '3',
    name: 'Cubeta Familiar (30)',
    description: 'Cubeta de 30 unidades. La mejor opción para familias grandes y reposteros.',
    price: 19000,
    image: 'https://picsum.photos/seed/eggtray/400/400',
    category: 'cubeta',
    badge: 'Ahorro'
  },
  {
    id: '4',
    name: 'Huevos Jumbo XL',
    description: 'Docena de huevos de tamaño extra grande. Doble proteína.',
    price: 10500,
    image: 'https://picsum.photos/seed/bigeggs/400/400',
    category: 'especial'
  },
  {
    id: '5',
    name: 'Canasta Regalo Gourmet',
    description: '12 huevos, miel orgánica y pan artesanal en canasta decorativa.',
    price: 35000,
    image: 'https://picsum.photos/seed/basket/400/400',
    category: 'especial',
    badge: 'Regalo'
  },
  {
    id: '6',
    name: 'Suscripción Semanal',
    description: 'Recibe una cubeta cada semana en tu puerta. Precio por mes.',
    price: 72000,
    image: 'https://picsum.photos/seed/delivery/400/400',
    category: 'cubeta'
  }
];