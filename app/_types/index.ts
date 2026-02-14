export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
}

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  brand: string;
  category: string;
  discountPercentage: number;
  images: string[];
  rating: number;
  stock: number;
  sku: string;
  weight: number; // in grams
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  tags?: string[];
};

