import express from 'express';
import cors from 'cors';
import {
  getOrders,
  createOrder,
  updateOrderStatus,
  getStock,
  toggleStockItem
} from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', store: 'THE SIP SPOT Backend Server', timestamp: new Date().toISOString() });
});

// GET all orders for admin
app.get('/api/orders', (req, res) => {
  const orders = getOrders();
  res.json({ success: true, count: orders.length, orders });
});

// POST new order from cart checkout
app.post('/api/orders', (req, res) => {
  try {
    const { customerName, customerPhone, orderType, branchName, deliveryAddress, items, subtotal, deliveryFee, grandTotal } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
    }

    const newOrder = createOrder({
      customerName,
      customerPhone,
      orderType,
      branchName,
      deliveryAddress,
      items,
      subtotal,
      deliveryFee,
      grandTotal
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (err) {
    console.error('Failed to create order:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PATCH update order status
app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: 'Status is required' });
  }

  const updated = updateOrderStatus(id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.json({ success: true, message: 'Order status updated', order: updated });
});

// GET stats summary
app.get('/api/stats', (req, res) => {
  const orders = getOrders();
  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const preparingOrders = orders.filter((o) => o.status === 'Preparing').length;

  res.json({
    success: true,
    totalOrders: orders.length,
    totalRevenue,
    pendingOrders,
    preparingOrders
  });
});

// GET stock availability
app.get('/api/stock', (req, res) => {
  const stock = getStock();
  res.json({ success: true, stock });
});

// POST toggle stock availability
app.post('/api/stock', (req, res) => {
  const { productId, isAvailable } = req.body;
  if (!productId) {
    return res.status(400).json({ success: false, message: 'productId is required' });
  }

  const updatedStock = toggleStockItem(productId, isAvailable);
  res.json({ success: true, stock: updatedStock });
});

app.listen(PORT, () => {
  console.log(`🚀 THE SIP SPOT Backend Server running at http://localhost:${PORT}`);
});
