import { Router } from "express";
import Product from "../models/product.js";


const productsRouter = Router();

productsRouter.post('/', async (req, res, next) => {
    try {
        let one = await Product.create(req.body);
        return res.status(201).json({
            success: true,
            message: `se creo un producto con el id: ${one._id}`
        });
    } catch (error) {
        next(error);
    }
});

productsRouter.get('/', async (req, res, next) => {
    try {
        let all = await Product.find();
        return res.status(200).json({
            success: true,
            response: all
        });
    } catch (error) {
        next(error);
    }
});

productsRouter.put('/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = req.body;
        let one = await Product.findByIdAndUpdate(id, data);
        return res.status(200).json({
            success: true,
            message: `Producto con id ${one._id} modificado`
        });
    } catch (error) {
        next(error);
    }
});

productsRouter.delete('/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = req.body;
        let one = await Product.findByIdAndDelete(id, data);
        return res.status(202).json({
            success: true,
            message: `Producto con ${one._id} eliminado`
        });
    } catch (error) {
        next(error);
    }
});

export default productsRouter;
