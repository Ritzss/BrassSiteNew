import { Product } from "@/Types/Product";

const similarProduct1 = {
  name: "Pure Brass Tumbler",
  description:
    "A traditional brass tumbler crafted for daily hydration. Inspired by Ayurvedic practices, it helps maintain the natural purity and alkalinity of drinking water.",
  category: "Drinkware",
  subcategory: "Brass Tumblers",
  D_discription:
    "Handcrafted from solid brass with a smooth polished finish. Perfect for serving water or traditional beverages while adding a timeless aesthetic to your tableware.",
  variants: [
    {
      images: ["/Demo/image.png"],
      capacity: 300,
      weight: 220,
      price: 24.99,
      color: "Classic Gold",
      mrp: 34.99,
    },
    {
      images: ["/Demo/image.png"],
      capacity: 450,
      weight: 260,
      price: 29.99,
      color: "Classic Gold",
      mrp: 39.99,
    },
  ],
  details: {
    features: [
      "Traditional Brass Drinkware",
      "Smooth Polished Finish",
      "Durable Solid Metal Build",
      "Reusable & Sustainable",
      "Ayurvedic Water Storage",
    ],
    material: "Pure Brass",
    finish: "Polished Metallic Finish",
    design: "Minimal Traditional Design",
    sustainability: "Reusable & Plastic-free",
    care: [
      "Clean with lemon and salt",
      "Hand wash recommended",
      "Dry after washing",
    ],
  },
};


const similarProduct2 = {
  name: "Hammered Brass Jug",
  description:
    "Serve water the traditional way with this handcrafted hammered brass jug designed for durability and timeless elegance.",
  category: "Drinkware",
  subcategory: "Brass Jugs",
  D_discription:
    "Featuring a handcrafted hammered texture, this brass jug is ideal for storing and serving water while maintaining Ayurvedic wellness traditions.",
  variants: [
    {
      images: ["/Demo/image.png"],
      capacity: 1200,
      weight: 650,
      price: 59.99,
      color: "Antique Gold",
      mrp: 79.99,
    },
    {
      images: ["/Demo/image.png"],
      capacity: 1500,
      weight: 720,
      price: 69.99,
      color: "Antique Gold",
      mrp: 89.99,
    },
  ],
  details: {
    features: [
      "Handcrafted Hammered Finish",
      "Ergonomic Handle",
      "Traditional Serving Design",
      "Durable Solid Brass",
      "Elegant Tableware",
    ],
    material: "Pure Brass",
    finish: "Hammered Antique Finish",
    design: "Traditional Jug with Handle",
    sustainability: "Reusable & Plastic-free",
    care: [
      "Use lemon and salt for cleaning",
      "Avoid dishwasher",
      "Dry completely after wash",
    ],
  },
};

const similarProduct3 = {
  name: "Brass Copper Fusion Bottle",
  description:
    "A premium fusion bottle combining brass and copper to enhance water purity while delivering a distinctive handcrafted look.",
  category: "Bottles",
  subcategory: "Fusion Bottles",
  D_discription:
    "This handcrafted bottle blends brass durability with copper’s wellness properties, making it a stylish and health-conscious hydration solution.",
  variants: [
    {
      images: ["/Demo/image.png"],
      capacity: 750,
      weight: 420,
      price: 54.99,
      color: "Brass & Copper",
      mrp: 74.99,
    },
    {
      images: ["/Demo/image.png"],
      capacity: 1000,
      weight: 480,
      price: 64.99,
      color: "Brass & Copper",
      mrp: 84.99,
    },
  ],
  details: {
    features: [
      "Dual Metal Construction",
      "Ayurvedic Water Storage",
      "Leak-Proof Cap",
      "Handcrafted Finish",
      "Premium Wellness Bottle",
    ],
    material: "Brass & Copper",
    finish: "Dual Metallic Finish",
    design: "Traditional Wellness Bottle",
    sustainability: "Reusable & Plastic-free",
    care: [
      "Clean with lemon and salt",
      "Avoid dishwasher",
      "Do not store acidic liquids",
    ],
  },
};

export const similarProducts: Product[] = [
  similarProduct1,
  similarProduct2,
  similarProduct3,
  similarProduct3,
  similarProduct3,
  similarProduct3,
  similarProduct3,
  similarProduct3,
];