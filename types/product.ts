export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  description: string;
  isNew: boolean;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  priceRange: {
    min: number;
    max: number;
  };
  showOnlyNew: boolean;
}

export type SortType = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'; 