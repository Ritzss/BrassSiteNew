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
  sustainability:string;
};

export type Product = {
  Productid?:string;
  name?: string;
  description?: string;
  category: string;
  subcategory: string;
  D_discription?: string;
  variants?: Variant[];
  details?: Details;
};
