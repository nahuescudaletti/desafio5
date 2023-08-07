import { Router } from "express";
import productsRouter from "./productsRouter.js";
import cartRouter from "./cartRouter.js";

const indexRouter =Router();

indexRouter.use('/products', productsRouter);
indexRouter.use('/carts', cartRouter);

export default indexRouter;