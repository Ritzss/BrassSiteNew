type Variant = {
  images: string[];
  capacity: number;
  weight: number;
  price: number;
  color: string;
  mrp: number;
};

type Details = {
  features: string[];
  material: string;
  finish: string;
  design: string;
  care: string[];
};

export type Product = {
  name?: string;
  description?: string;
  category: string;
  subcategory: string;
  D_discription?: string;
  variants?: Variant[];
  details?: Details;
};
