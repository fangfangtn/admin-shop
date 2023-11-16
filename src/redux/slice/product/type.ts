export interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  createdAt: number;
  count: number;
  sizes: [];
  colors: [];
}
