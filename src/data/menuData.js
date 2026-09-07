// THE SIP SPOT Official Menu Data (Extracted 100% directly from official menu flyer)

export const STORE_INFO = {
  name: "THE SIP SPOT",
  subtitle: "FRESH JUICES & SMOOTHIES",
  tagline: "Pure Taste, Pure Health",
  slogan: "Sip Fresh, Live Fresh!",
  location: "Lane 5 Near Nisar Hospital, Westridge 1, Main Peshawar Road, Rawalpindi",
  phone: "0315-9320765",
  whatsapp: "+923159320765",
  hours: "10:00 AM - 12:00 AM (Mon - Sun)",
  badges: [
    { label: "100% NATURAL", desc: "Pure organic fruit" },
    { label: "NO ADDED SUGAR", desc: "Naturally sweetened" },
    { label: "FRESH & HYGIENIC", desc: "Mountain ice chilled" },
    { label: "HEALTHY CHOICE", desc: "Doctor recommended" }
  ]
};

export const MENU_CATEGORIES = [
  {
    id: "all",
    label: "All Specials",
    archBg: "#EA580C",
    color: "#EA580C",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "shakes",
    label: "Shakes",
    archBg: "#D97706",
    color: "#EA580C",
    image: "/images/cat_shakes_3d.png"
  },
  {
    id: "fresh_juices",
    label: "Fresh Juices",
    archBg: "#16A34A",
    color: "#16A34A",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "hot_drinks",
    label: "Hot Drinks",
    archBg: "#C2410C",
    color: "#C2410C",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "cold_drinks",
    label: "Cold Drinks",
    archBg: "#E11D48",
    color: "#E11D48",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "food",
    label: "Food",
    archBg: "#D97706",
    color: "#D97706",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=200&q=80"
  }
];

export const PRODUCTS = [
  // --- SHAKES (Rs. 350) ---
  {
    id: "shake-1",
    name: "Apple Banana Milkshake",
    category: "shakes",
    price: 350,
    calories: "280 kcal",
    rating: 4.9,
    description: "Creamy blend of organic fresh apples, golden bananas, and chilled milk.",
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80",
    tags: ["Best Seller"],
    color: "#EA580C"
  },
  {
    id: "shake-2",
    name: "Chocolate Banana Milkshake",
    category: "shakes",
    price: 350,
    calories: "340 kcal",
    rating: 4.8,
    description: "Rich cocoa blended with banana slices, cream milk, and chocolate syrup.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    tags: ["Chocolate"],
    color: "#EA580C"
  },
  {
    id: "shake-3",
    name: "Dates Banana Milkshake",
    category: "shakes",
    price: 350,
    calories: "310 kcal",
    rating: 5.0,
    description: "Natural energy power shake: Khajur dates blended with banana and chilled milk.",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80",
    tags: ["Superfood"],
    color: "#EA580C"
  },
  {
    id: "shake-4",
    name: "Oreo Shake",
    category: "shakes",
    price: 350,
    calories: "410 kcal",
    rating: 4.9,
    description: "Crushed Oreo cookies swirled with rich vanilla cream and cold milk.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    tags: ["Customer Favorite"],
    color: "#EA580C"
  },
  {
    id: "shake-5",
    name: "Strawberry Milkshake",
    category: "shakes",
    price: 350,
    calories: "260 kcal",
    rating: 4.8,
    description: "Farm fresh juicy strawberries crushed with cold cream milk.",
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80",
    tags: ["Fresh Strawberry"],
    color: "#EA580C"
  },
  {
    id: "shake-6",
    name: "Mango Milkshake",
    category: "shakes",
    price: 350,
    calories: "290 kcal",
    rating: 5.0,
    description: "Ripe Sindhri mango pulp blended to velvety perfection with chilled milk.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&q=80",
    tags: ["Summer Special"],
    color: "#EA580C"
  },
  {
    id: "shake-7",
    name: "Sattu Milkshake",
    category: "shakes",
    price: 350,
    calories: "220 kcal",
    rating: 4.7,
    description: "Traditional roasted gram flour (Sattu) super-shake with brown sugar and ice milk.",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80",
    tags: ["Traditional"],
    color: "#EA580C"
  },

  // --- FRESH JUICES ---
  {
    id: "juice-1",
    name: "Peach Juice",
    category: "fresh_juices",
    price: 350,
    calories: "140 kcal",
    rating: 4.8,
    description: "Cold-pressed juicy peaches with sparkling soda and crushed mint ice.",
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=600&q=80",
    tags: ["Hydrating"],
    color: "#16A34A"
  },
  {
    id: "juice-2",
    name: "Falsa Juice",
    category: "fresh_juices",
    price: 300,
    calories: "120 kcal",
    rating: 4.9,
    description: "Wild purple Falsa berries pressed with black salt and crushed mountain ice.",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80",
    tags: ["Summer Classic"],
    color: "#16A34A"
  },
  {
    id: "juice-3",
    name: "Mint Margarita",
    category: "fresh_juices",
    price: 200,
    calories: "90 kcal",
    rating: 5.0,
    description: "Zesty garden mint, lemon juice, black salt, sprite, and fine shaved ice.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    tags: ["#1 Refreshment"],
    color: "#16A34A"
  },
  {
    id: "juice-4",
    name: "ABC Juice",
    category: "fresh_juices",
    price: 300,
    calories: "160 kcal",
    rating: 4.9,
    description: "Cold-pressed blend of Apple, Beetroot, and Carrot for immunity and natural glow.",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
    tags: ["Detox Glow"],
    color: "#16A34A"
  },
  {
    id: "juice-5",
    name: "Lemon Mint Cooler",
    category: "fresh_juices",
    price: 200,
    calories: "80 kcal",
    rating: 4.8,
    description: "Freshly squeezed lemons, mint leaves, organic cane sugar, and crystal ice.",
    image: "https://images.unsplash.com/photo-1523371054106-bbf80586c38c?auto=format&fit=crop&w=600&q=80",
    tags: ["Vitamin C"],
    color: "#16A34A"
  },
  {
    id: "juice-6",
    name: "Herbal Juice",
    category: "fresh_juices",
    price: 300,
    calories: "75 kcal",
    rating: 4.7,
    description: "Natural herbal juice blend infused with mint, ginger, and lemon.",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80",
    tags: ["Herbal Blend"],
    color: "#16A34A"
  },
  {
    id: "juice-7",
    name: "Detox Juice",
    category: "fresh_juices",
    price: 300,
    calories: "70 kcal",
    rating: 4.8,
    description: "Pure green blend of cucumber, celery, spinach, ginger, green apple, and lemon.",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80",
    tags: ["Cleansing"],
    color: "#16A34A"
  },
  {
    id: "juice-8",
    name: "Special Arabic Lassie",
    category: "fresh_juices",
    price: 400,
    calories: "320 kcal",
    rating: 5.0,
    description: "Thick creamy yogurt lassi infused with saffron, sliced pistachios, and rose water.",
    image: "https://images.unsplash.com/photo-1571006682860-9c294101e479?auto=format&fit=crop&w=600&q=80",
    tags: ["Royal Special"],
    color: "#16A34A"
  },
  {
    id: "juice-9",
    name: "Simple Lassie",
    category: "fresh_juices",
    price: 200,
    calories: "240 kcal",
    rating: 4.8,
    description: "Traditional chilled Pakistani sweet yogurt drink topped with thick cream (Malai).",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80",
    tags: ["Classic Lassi"],
    color: "#16A34A"
  },
  {
    id: "juice-10",
    name: "All Type of Fresh Juices",
    category: "fresh_juices",
    price: 300,
    calories: "120 kcal",
    rating: 4.9,
    description: "Custom fresh seasonal fruit juice made to order (Orange, Pomegranate, Apple, etc.).",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
    tags: ["Custom Fruit"],
    color: "#16A34A"
  },

  // --- HOT DRINKS ---
  {
    id: "hot-1",
    name: "Hot Coffee",
    category: "hot_drinks",
    price: 200,
    calories: "120 kcal",
    rating: 4.8,
    description: "Freshly brewed Arabica coffee with steamed milk foam.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    tags: ["Brewed Coffee"],
    color: "#C2410C"
  },
  {
    id: "hot-2",
    name: "Tea",
    category: "hot_drinks",
    price: 100,
    calories: "90 kcal",
    rating: 4.9,
    description: "Traditional Pakistani Karak Doodh Patti tea brewed with cardamom.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    tags: ["Karak Chai"],
    color: "#C2410C"
  },
  {
    id: "hot-3",
    name: "Green Tea",
    category: "hot_drinks",
    price: 120,
    calories: "10 kcal",
    rating: 4.7,
    description: "Steeped Himalayan green tea leaves served with lemon and honey.",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=600&q=80",
    tags: ["Organic Green Tea"],
    color: "#C2410C"
  },

  // --- COLD DRINKS ---
  {
    id: "cold-1",
    name: "Cold Coffee",
    category: "cold_drinks",
    price: 250,
    calories: "210 kcal",
    rating: 4.9,
    description: "Double shot espresso shaken with ice cubes, chocolate syrup, and cold vanilla milk.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    tags: ["Chilled Espresso"],
    color: "#E11D48"
  },
  {
    id: "cold-2",
    name: "Cold Chocolate",
    category: "cold_drinks",
    price: 250,
    calories: "260 kcal",
    rating: 4.8,
    description: "Rich dark cocoa milk blend served over crushed mountain ice.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    tags: ["Rich Cocoa"],
    color: "#E11D48"
  },
  {
    id: "cold-3",
    name: "Mint Lemonade",
    category: "cold_drinks",
    price: 200,
    calories: "85 kcal",
    rating: 4.9,
    description: "Refreshing squeezed lemon, garden mint, black salt, and sparkling ice soda.",
    image: "https://images.unsplash.com/photo-1523371054106-bbf80586c38c?auto=format&fit=crop&w=600&q=80",
    tags: ["Minty Fresh"],
    color: "#E11D48"
  },
  {
    id: "cold-4",
    name: "Iced Tea",
    category: "cold_drinks",
    price: 180,
    calories: "75 kcal",
    rating: 4.7,
    description: "Chilled black tea infused with lemon zest, mint, and ice.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    tags: ["Lemon Iced Tea"],
    color: "#E11D48"
  },

  // --- FOOD ---
  {
    id: "food-1",
    name: "Plain Chicken Sandwich",
    category: "food",
    price: 250,
    calories: "320 kcal",
    rating: 4.8,
    description: "Shredded chicken breast, light mayo, black pepper, and fresh lettuce on toasted bread.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    tags: ["Toasted Sandwich"],
    color: "#D97706"
  },
  {
    id: "food-2",
    name: "Vegetable Sandwich",
    category: "food",
    price: 200,
    calories: "240 kcal",
    rating: 4.7,
    description: "Sliced cucumbers, tomatoes, bell peppers, mint chutney, and cheddar cheese slice.",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80",
    tags: ["Veggie Healthy"],
    color: "#D97706"
  },
  {
    id: "food-3",
    name: "Spicy Chicken Tikka Sandwich",
    category: "food",
    price: 300,
    calories: "380 kcal",
    rating: 5.0,
    description: "Charcoal grilled tikka chicken, spicy garlic cream, pickled onions, and toasted press.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    tags: ["Spicy Tikka"],
    color: "#D97706"
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Usman Khan",
    location: "Westridge 1, Rawalpindi",
    rating: 5,
    comment: "The Mint Margarita (Rs. 200) and Mango Milkshake (Rs. 350) at The Sip Spot are out of this world!",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Fatima Zahra",
    location: "Main Peshawar Road",
    rating: 5,
    comment: "100% natural juices with no added sugar. Their Peach Juice and ABC Juice are super fresh & hygienic!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  }
];
