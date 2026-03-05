import DetailPage from '@/components/ProductPage/DetailPage'

const page = () => {

  const product = {
  name: "Pure Brass Bottle",
  description:
    "Experience the ancient wisdom of Ayurveda with our handcrafted brass water bottle. Designed to naturally alkalize and purify your water while supporting your wellness journey.",
  category: "Bottles",
  subcategory: "Brass Bottles",
  D_discription:
    "Made from high-quality solid brass, this handcrafted bottle features a textured hammered finish for improved grip and visual appeal. Ideal for storing drinking water in a sustainable and durable container.",
  variants: [
    {
      images: [
        "/Demo/Images/image.png",
        "/Demo/Images/image.png",
        "/Demo/Images/image.png",
      ],
      capacity: 500, // ml
      weight: 380, // grams
      price: 51.99,
      color: "Antique Gold",
      mrp: 16.99
    },
    {
      images: [
        "/Demo/Images/image.png",
        "/Demo/Images/image.png",
      ],
      capacity: 750, // ml
      weight: 280, // grams
      price: 41.99,
      color: "Antique Gold",
      mrp: 16.99
    },
    {
      images: [
        "/Demo/Images/image.png",
      ],
      capacity: 1000, // ml
      weight: 280, // grams
      price: 31.99,
      color: "Antique Gold",
      mrp: 16.99
    }
  ],
  details: {
    features: [
      "Solid Brass Construction",
      "Handcrafted Hammered Texture",
      "Leak-Proof Screw Cap",
      "Reusable & Eco-Friendly",
      "Traditional Ayurvedic Storage"
    ],
    material: "Pure Brass",
    finish: "Hammered Matte Metallic Finish",
    design: "Cylindrical Body with Textured Grip Pattern",
    care: [
      "Clean with lemon and salt to maintain shine",
      "Do not use in dishwasher",
      "Avoid storing acidic liquids for long durations",
      "Dry thoroughly after washing"
    ]
  }
};

  return (
    <div className="min-h-screen">
        <DetailPage product={product}/>
    </div>
  )
}

export default page