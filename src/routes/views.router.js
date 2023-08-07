import { Router } from 'express';
import Product from '../models/product.js';

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

//    try {
//         let allProducts = await Product.find().toArray();
//         res.render('productsMongoDB', { all: allProducts });
//     } catch (error) {
//         res.status(500).send('Error al obtener los productos.');
//     }
});

export default router;
