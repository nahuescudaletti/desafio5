// routes/cartRouter.js

import { Router } from "express";
import Cart from "../models/Cart.js";

const cartRouter = Router();

// Obtener todos los carritos
cartRouter.get("/", async (req, res, next) => {
  try {
    const carts = await Cart.find().populate("products");
    return res.status(200).json({
      success: true,
      response: carts,
    });
  } catch (error) {
    next(error);
  }
});

// Obtener un carrito por ID
cartRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findById(id).populate("products");
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Carrito no encontrado",
      });
    }
    return res.status(200).json({
      success: true,
      response: cart,
    });
  } catch (error) {
    next(error);
  }
});

// Crear un nuevo carrito
cartRouter.post("/", async (req, res, next) => {
  try {
    const newCart = await Cart.create({ products: [] });
    return res.status(201).json({
      success: true,
      message: "Carrito creado exitosamente",
      response: newCart,
    });
  } catch (error) {
    next(error);
  }
});

// Agregar un producto al carrito
cartRouter.post("/:id/addProduct", async (req, res, next) => {
  const { id } = req.params;
  const { productId } = req.body;
  try {
    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Carrito no encontrado",
      });
    }
    cart.products.push(productId);
    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Producto agregado al carrito exitosamente",
    });
  } catch (error) {
    next(error);
  }
});

// Eliminar un carrito
cartRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Carrito no encontrado",
      });
    }
    return res.status(202).json({
      success: true,
      message: "Carrito eliminado exitosamente",
    });
  } catch (error) {
    next(error);
  }
});

export default cartRouter;
