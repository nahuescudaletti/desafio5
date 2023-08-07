import { Router } from "express";
import productsRouter from "./productsRouter.js";

const indexRouter =Router();

indexRouter.use('/products', productsRouter);

export default indexRouter;