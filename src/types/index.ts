export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  seoDescription: string;
  images: string[];
  colors: string[];
  sizes: string[];
  category: string;
  fabric: string;
  handworkDetails: string;
  inStock: boolean;
}

export interface CartItem {
  id: string; // Unique ID for the cart item (product.id + size + color)
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}