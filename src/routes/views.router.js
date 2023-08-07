import { Router } from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const router = Router();

router.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts');
});

router.get('/home', (req, res) => {
  res.render('home');
});

router.get('/products', async (req, res, next) => {
  try {
    const allProducts = await Product.find().lean().exec();
    res.render('productsMongoDB', { all: allProducts });
  } catch (error) {
    next(error);
  }
});

router.get('/carts', async (req, res, next) => {
  try {
    const allCarts = await Cart.find().populate('products').lean().exec();
    res.render('cartsMongoDB', { all: allCarts });
  } catch (error) {
    next(error);
  }
});

export default router;
