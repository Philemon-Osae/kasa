export const GHANA_PRODUCTS = [
  // FISH - Dried/Salted - your main
  "kobi", "koobi", "kako", "momoni", "momone", "adwene", "tuna", "sardine", "sardin",
  "smoked fish", "dried fish", "salted fish", "anchovies", "keta school boys",
  
  // TOMATOES / VEGETABLES - Araba style
  "tomato", "tomatoes", "tomatoe", "kante", "onion", "onions", "shallot", "pepper", "peppers",
  "kpakpo shito", "green pepper", "carrot", "cabbage", "lettuce", "cucumber",
  "garden eggs", "garden egg", "okro", "okra", "kontomire", "aleefu", "ayoyo",
  "ginger", "garlic", "green leaf", "ntoosi", "dawadawa",
  
  // FOOD STUFF / PROVISIONS
  "gari", "gari fortified", "plantain", "yam", "cocoyam", "kokoo", "rice", "local rice", "perfumed rice",
  "beans", "gob3 beans", "red beans", "maize", "corn", "milo", "oats",
  "oil", "palm oil", "frytol", "zomi", "sugar", "milk", "ideal milk", "nido",
  "sardine tin", "tomato tin", "tin tomato", "mackerel", "geisha",
  
  // SHOES / BAGS / CLOTHES
  "shoe", "shoes", "sneaker", "slipper", "slippers", "sandal", "sandals", "heel", "boot",
  "bag", "bags", "handbag", "school bag", "backpack", "purse",
  "dress", "dresses", "shirt", "shirts", "blouse", "skirt", "trouser", "jeans",
  "lace", "african print", "gown", "kaftan", "boxer", "singlet",
  
  // MARKET GENERAL
  "curtain", "curtains", "pillow", "bedsheet", "towel", "soap", "detergent",
  "sponge", "bucket", "bowl", "broom", "mop",
  
  // FRUITS
  "banana", "orange", "watermelon", "pineapple", "pawpaw", "mango", "apple", "avocado", "pear"
];

export function extractSale(text) {
  const lower = text.toLowerCase();
  
  // Find item - check longest first so "smoked fish" before "fish"
  const sorted = [...GHANA_PRODUCTS].sort((a,b) => b.length - a.length);
  let item = sorted.find(p => lower.includes(p)) || "product";
  
  // If not in list, try to get word before GH
  if (item === "product") {
    const rawMatch = lower.match(/(\w+)\s+(?:for\s+)?gh/i);
    if (rawMatch) item = rawMatch[1];
  }

  // Amount - GH150, 150, one fifty
  let amount = 100;
  const m = lower.match(/(?:gh|ghs|cedis)?\s*(\d{2,4})/);
  if (m) amount = parseInt(m[1]);
  if (lower.includes("one fifty") || lower.includes("150")) amount = 150;
  if (lower.includes("two hundred") || lower.includes("200")) amount = 200;
  if (lower.includes("fifty")) amount = 50;
  if (lower.includes("hundred")) amount = 100;

  // Customer - ama Ama, ma Ama, to Ama
  let customer = "Customer";
  const cm = text.match(/(?:ama|ma|to|for)\s+([A-Z]\w+)/i);
  if (cm) customer = cm[1];

  return { item, amount, customer, rawText: text };
}