export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  description: string;
  isNew: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
