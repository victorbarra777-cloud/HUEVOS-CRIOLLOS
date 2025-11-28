export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'docena' | 'media-docena' | 'cubeta' | 'especial';
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  cookingTime: string;
  difficulty: string;
}

export enum ViewState {
  HOME = 'HOME',
  SHOP = 'SHOP',
  RECIPES = 'RECIPES',
  ABOUT = 'ABOUT'
}