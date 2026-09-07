// THE SIP SPOT Menu Data (Extracted directly from user menu image)

export const STORE_INFO = {
  name: "THE SIP SPOT",
  subtitle: "FRESH JUICES & SMOOTHIES",
  tagline: "Pure Taste, Pure Health",
  slogan: "Sip Fresh, Live Fresh!",
  location: "Lane 5 Near Nisar Hospital, Westridge 1, Main Peshawar Road, Rawalpindi",
  phone: "03159320765",
  whatsapp: "+923159320765",
  hours: "10:00 AM - 12:00 AM (Mon - Sun)",
  badges: [
    { label: "100% NATURAL", icon: "🌱", color: "#00E676" },
    { label: "NO ADDED SUGAR", icon: "🍯", color: "#FFB800" },
    { label: "FRESH & HYGIENIC", icon: "✨", color: "#00E5FF" },
    { label: "HEALTHY CHOICE", icon: "❤️", color: "#FF3366" }
  ]
};

export const MENU_CATEGORIES = [
  { id: "all", label: "All Specials", icon: "🌟" },
  { id: "shakes", label: "Shakes", icon: "🥤" },
  { id: "fresh_juices", label: "Fresh Juices", icon: "🍹" },
  { id: "hot_drinks", label: "Hot Drinks", icon: "☕" },
  { id: "cold_drinks", label: "Cold Drinks", icon: "🧊" },
  { id: "food", label: "Food & Sandwiches", icon: "🥪" }
];

export const PRODUCTS = [
  // --- SHAKES ---
  {
    id: "shake-1",
    name: "Apple Banana Milkshake",
    category: "shakes",
    price: 320,
    calories: "280 kcal",
    rating: 4.9,
    description: "Creamy blend of fresh organic apples, golden bananas, chilled whole milk, and a pinch of cinnamon.",
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80",
    tags: ["Best Seller", "Energy Boost"],
    color: "#FFD700",
    popular: true
  },
  {
    id: "shake-2",
    name: "Chocolate Banana Milkshake",
    category: "shakes",
    price: 350,
    calories: "340 kcal",
    rating: 4.8,
    description: "Rich dark cocoa infused with ripe banana slices, creamy ice cream, and chocolate syrup drizzle.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    tags: ["Decadent", "Kids Favorite"],
    color: "#8B4513",
    popular: true
  },
  {
    id: "shake-3",
    name: "Dates Banana Milkshake",
    category: "shakes",
    price: 380,
    calories: "310 kcal",
    rating: 5.0,
    description: "Natural energy powerhouse: Premium Khajur dates blended with banana, almonds, and chilled milk.",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80",
    tags: ["Superfood", "No Sugar Added"],
    color: "#A0522D",
    popular: true
  },
  {
    id: "shake-4",
    name: "Oreo Shake",
    category: "shakes",
    price: 360,
    calories: "410 kcal",
    rating: 4.9,
    description: "Crushed Oreo biscuits swirled with vanilla bean ice cream, thick milk, and chocolate crunch topping.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    tags: ["Top Trending", "Extra Thick"],
    color: "#2F4F4F",
    popular: true
  },
  {
    id: "shake-5",
    name: "Strawberry Milkshake",
    category: "shakes",
    price: 340,
    calories: "260 kcal",
    rating: 4.8,
    description: "Juicy farm-fresh strawberries crushed with rich milk and topped with fresh berry compote.",
    image: "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=600&q=80",
    tags: ["Refreshing", "Vitamin C"],
    color: "#FF1493",
    popular: false
  },
  {
    id: "shake-6",
    name: "Mango Milkshake",
    category: "shakes",
    price: 380,
    calories: "290 kcal",
    rating: 5.0,
    description: "King of summer! Ripe Sindhri mango pulp blended to velvety perfection with chilled cream milk.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&q=80",
    tags: ["Summer Special", "Seasonal Hero"],
    color: "#FFA500",
    popular: true
  },
  {
    id: "shake-7",
    name: "Sattu Milkshake",
    category: "shakes",
    price: 300,
    calories: "220 kcal",
    rating: 4.7,
    description: "Traditional roasted gram flour (Sattu) super-shake with brown sugar, cardamom, and cold milk.",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80",
    tags: ["Desi Superfood", "High Protein"],
    color: "#DAA520",
    popular: false
  },

  // --- FRESH JUICES ---
  {
    id: "juice-1",
    name: "Peach Juice",
    category: "fresh_juices",
    price: 300,
    calories: "140 kcal",
    rating: 4.8,
    description: "Cold-pressed juicy peaches with a splash of sparkling soda and crushed mint ice.",
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=600&q=80",
    tags: ["Hydrating", "Sweet & Tangy"],
    color: "#FF7F50",
    popular: true
  },
  {
    id: "juice-2",
    name: "Falsa Juice",
    category: "fresh_juices",
    price: 320,
    calories: "120 kcal",
    rating: 4.9,
    description: "Traditional summer elixir made from wild purple Falsa berries, black salt, and crushed ice.",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80",
    tags: ["Cooling", "Summer Hit"],
    color: "#800080",
    popular: true
  },
  {
    id: "juice-3",
    name: "Mint Margarita",
    category: "fresh_juices",
    price: 280,
    calories: "90 kcal",
    rating: 5.0,
    description: "Zesty fresh mint leaves, lemon juice, black salt, sprite, and ultra-fine shaved ice.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    tags: ["#1 Refreshment", "Instant Chill"],
    color: "#00FF7F",
    popular: true
  },
  {
    id: "juice-4",
    name: "ABC Juice",
    category: "fresh_juices",
    price: 350,
    calories: "160 kcal",
    rating: 4.9,
    description: "Ultimate miracle drink: Apple, Beetroot, and Carrot cold-pressed for maximum glow & immunity.",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
    tags: ["Detox Glow", "Doctor Recommended"],
    color: "#B22222",
    popular: true
  },
  {
    id: "juice-5",
    name: "Lemon Mint Cooler",
    category: "fresh_juices",
    price: 250,
    calories: "80 kcal",
    rating: 4.8,
    description: "Squeezed lemons, garden mint leaves, organic cane sugar, and crystal mountain ice.",
    image: "https://images.unsplash.com/photo-1523371054106-bbf80586c38c?auto=format&fit=crop&w=600&q=80",
    tags: ["Classic", "Vitamin C"],
    color: "#7FFF00",
    popular: false
  },
  {
    id: "juice-6",
    name: "Herbal Detox Juice",
    category: "fresh_juices",
    price: 330,
    calories: "70 kcal",
    rating: 4.7,
    description: "Pure green blend of cucumber, celery, spinach, ginger, green apple, and lemon.",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80",
    tags: ["Zero Sugar", "Cleansing"],
    color: "#228B22",
    popular: false
  },
  {
    id: "juice-7",
    name: "Special Arabic Lassi",
    category: "fresh_juices",
    price: 340,
    calories: "320 kcal",
    rating: 4.9,
    description: "Thick creamy yogurt lassi infused with saffron threads, pistachio shavings, and rose water.",
    image: "https://images.unsplash.com/photo-1571006682860-9c294101e479?auto=format&fit=crop&w=600&q=80",
    tags: ["Royal Signature", "Rich Yogurt"],
    color: "#FAFAD2",
    popular: true
  },
  {
    id: "juice-8",
    name: "Simple Sweet Lassi",
    category: "fresh_juices",
    price: 240,
    calories: "250 kcal",
    rating: 4.8,
    description: "Traditional chilled Pakistani sweet yogurt drink topped with thick cream (Malai).",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80",
    tags: ["Traditional", "Comforting"],
    color: "#FFFFFF",
    popular: false
  },

  // --- HOT DRINKS ---
  {
    id: "hot-1",
    name: "Hot Coffee",
    category: "hot_drinks",
    price: 280,
    calories: "120 kcal",
    rating: 4.8,
    description: "Freshly brewed Arabica espresso beans steamed with silky milk foam and cocoa dusting.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    tags: ["Fresh Roast", "Aromatic"],
    color: "#3B2F2F",
    popular: false
  },
  {
    id: "hot-2",
    name: "Special Karak Tea",
    category: "hot_drinks",
    price: 180,
    calories: "110 kcal",
    rating: 4.9,
    description: "Slow-brewed black tea with crushed cardamom, ginger, whole milk, and brown sugar.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    tags: ["Pakistani Favorite", "Cardamom Aroma"],
    color: "#CD853F",
    popular: true
  },
  {
    id: "hot-3",
    name: "Organic Green Tea",
    category: "hot_drinks",
    price: 160,
    calories: "10 kcal",
    rating: 4.7,
    description: "Steeped Himalayan green tea leaves served with fresh lemon slices and raw honey.",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=600&q=80",
    tags: ["Antioxidant", "Light & Pure"],
    color: "#6B8E23",
    popular: false
  },

  // --- COLD DRINKS ---
  {
    id: "cold-1",
    name: "Iced Cold Coffee",
    category: "cold_drinks",
    price: 320,
    calories: "210 kcal",
    rating: 4.9,
    description: "Double shot espresso shaken with ice cubes, dark chocolate syrup, and cold vanilla milk.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    tags: ["Chilled Espresso", "Summer Pick"],
    color: "#4A3B32",
    popular: true
  },

  // --- FOOD ---
  {
    id: "food-1",
    name: "Plain Chicken Sandwich",
    category: "food",
    price: 350,
    calories: "320 kcal",
    rating: 4.8,
    description: "Shredded grilled chicken breast, light mayo, black pepper, and crisp lettuce on toasted sourdough.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    tags: ["Protein Snack", "Fresh Bread"],
    color: "#D2691E",
    popular: true
  },
  {
    id: "food-2",
    name: "Fresh Vegetable Sandwich",
    category: "food",
    price: 280,
    calories: "240 kcal",
    rating: 4.7,
    description: "Sliced cucumbers, vine tomatoes, bell peppers, mint chutney, and cheddar cheese slice.",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80",
    tags: ["Vegetarian", "Healthy Choice"],
    color: "#32CD32",
    popular: false
  },
  {
    id: "food-3",
    name: "Spicy Chicken Tikka Sandwich",
    category: "food",
    price: 390,
    calories: "380 kcal",
    rating: 5.0,
    description: "Charcoal grilled tikka chicken chunks, spicy garlic sauce, pickled onions, and toasted panini press.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    tags: ["Spicy Delight", "Chef Special"],
    color: "#FF4500",
    popular: true
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Usman Khan",
    location: "Westridge Rawalpindi",
    rating: 5,
    comment: "The Mint Margarita and Mango Milkshake at The Sip Spot are out of this world! Absolute summer lifesaver.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Fatima Zahra",
    location: "Main Peshawar Road",
    rating: 5,
    comment: "100% natural juices with no sugar added. Their ABC juice and Falsa juice are super fresh and hygienic!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Hamza Malik",
    location: "Islamabad",
    rating: 5,
    comment: "Spicy Chicken Tikka Sandwich + Cold Coffee combo is 10/10. Great service near Nisar Hospital!",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
  }
];
