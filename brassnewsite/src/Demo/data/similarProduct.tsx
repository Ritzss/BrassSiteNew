import { Product } from "@/Types/Product";

const product = {
  Productid: "bb1",
  name: "Pure Brass Bottle",
  description:
    "Experience the ancient wisdom of Ayurveda with our handcrafted brass water bottle. Designed to naturally alkalize and purify your water while supporting your wellness journey.",

  category: "bottles",
  subcategory: "brass bottles",

  D_discription:
    "Made from high-quality solid brass, this handcrafted bottle features a textured hammered finish for improved grip and visual appeal. Ideal for storing drinking water in a sustainable and durable container.",

  variants: [
    {
      images: [
        "/Demo/Images/image.png",
        "/Demo/Images/image.png",
        "/Demo/Images/image.png",
        "/Demo/Images/image.png",
      ],
      capacity: 250,
      weight: 210,
      price: 21.99,
      color: "Antique Gold",
      mrp: 16.99,
    },
    {
      images: [
        "/Demo/Images/image.png",
        "/Demo/Images/image.png",
        "/Demo/Images/image.png",
      ],
      capacity: 500,
      weight: 380,
      price: 31.99,
      color: "Antique Gold",
      mrp: 16.99,
    },
    {
      images: ["/Demo/Images/image.png", "/Demo/Images/image.png"],
      capacity: 750,
      weight: 280,
      price: 41.99,
      color: "Antique Gold",
      mrp: 16.99,
    },
    {
      images: ["/Demo/Images/image.png"],
      capacity: 1000,
      weight: 280,
      price: 51.99,
      color: "Antique Gold",
      mrp: 16.99,
    },
  ],

  details: {
    features: [
      "Solid Brass Construction",
      "Handcrafted Hammered Texture",
      "Leak-Proof Screw Cap",
      "Reusable & Eco-Friendly",
      "Traditional Ayurvedic Storage",
    ],
    material: "Pure Brass",
    finish: "Hammered Matte Metallic",
    design: "Textured Grip Pattern",
    sustainability: "Reusable",
    care: [
      "Clean with lemon and salt to maintain shine",
      "Do not use in dishwasher",
      "Avoid storing acidic liquids for long durations",
      "Dry thoroughly after washing",
    ],
  },
};

const similarProduct1 = {
  Productid: "bt1",
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
  Productid: "bj1",
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
  Productid: "fb1",
  name: "Brass Copper Fusion Bottle",
  description:
    "A premium fusion bottle combining brass and copper to enhance water purity while delivering a distinctive handcrafted look.",
  category: "bottles",
  subcategory: "fusion bottles",
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


export const similarProducts: Product[] = [
  similarProduct1,
  similarProduct2,
  similarProduct3,
  product,
];
