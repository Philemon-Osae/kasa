export const GHANA_PRODUCTS = [
  "kobi", "koobi", "momoni", "momone", "kako", "tuna",
  "tomato", "tomatoes", "onion", "onions", "pepper", "gari", "plantain", "yam",
  "shoe", "shoes", "bag", "bags", "slipper", "dress",
  "rice", "oil", "sugar", "milk"
];

export function extractSale(text) {
  const lower = text.toLowerCase();
  let item = GHANA_PRODUCTS.find(p => lower.includes(p)) || "product";
  let amount = 150;
  const m = lower.match(/(\d+)/);
  if (m) amount = parseInt(m[0]);
  if (lower.includes("one fifty")) amount = 150;
  let customer = "Ama";
  const cm = text.match(/ama (\w+)/i);
  if (cm) customer = cm[1];
  return { item, amount, customer, rawText: text };
}