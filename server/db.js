import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'store.json');

// Initial default database state
const defaultData = {
  orderCounter: 1001,
  orders: [
    {
      id: "SIP-1001",
      orderNumber: "#SIP-1001",
      customerName: "Usman Khan",
      customerPhone: "0312-5551234",
      orderType: "pickup",
      branchName: "The Sip Spot — Westridge 1",
      deliveryAddress: "",
      items: [
        { id: "shake-[shake-6]", name: "Mango Milkshake", price: 350, quantity: 2 },
        { id: "juice-[juice-3]", name: "Mint Margarita", price: 200, quantity: 1 }
      ],
      subtotal: 900,
      deliveryFee: 0,
      grandTotal: 900,
      status: "Preparing",
      createdAt: new Date(Date.now() - 15 * 60000).toISOString()
    }
  ],
  stock: {}
};

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database:', err);
    return defaultData;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing database:', err);
  }
}

export function getOrders() {
  const db = readDb();
  return db.orders || [];
}

export function createOrder(orderPayload) {
  const db = readDb();
  const nextNum = db.orderCounter || 1001;
  const orderNumber = `#SIP-${nextNum}`;

  const newOrder = {
    id: `SIP-${nextNum}`,
    orderNumber,
    customerName: orderPayload.customerName || 'Guest Customer',
    customerPhone: orderPayload.customerPhone || '',
    orderType: orderPayload.orderType || 'pickup',
    branchName: orderPayload.branchName || 'The Sip Spot — Westridge 1',
    deliveryAddress: orderPayload.deliveryAddress || '',
    items: orderPayload.items || [],
    subtotal: orderPayload.subtotal || 0,
    deliveryFee: orderPayload.deliveryFee || 0,
    grandTotal: orderPayload.grandTotal || 0,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  db.orders.unshift(newOrder);
  db.orderCounter = nextNum + 1;
  writeDb(db);

  return newOrder;
}

export function updateOrderStatus(orderId, status) {
  const db = readDb();
  const order = db.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  if (!order) return null;

  order.status = status;
  writeDb(db);
  return order;
}

export function getStock() {
  const db = readDb();
  return db.stock || {};
}

export function toggleStockItem(productId, isAvailable) {
  const db = readDb();
  if (!db.stock) db.stock = {};
  db.stock[productId] = isAvailable;
  writeDb(db);
  return db.stock;
}
