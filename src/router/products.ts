import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, getProductById, listProduct, searchProduct, updateProduct } from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import { adminMddleware } from "../middlewares/admin";

const productsRoutes: Router = Router();

productsRoutes.post('/', [authMiddleware, adminMddleware], errorHandler(createProduct));
productsRoutes.put('/:id', [authMiddleware, adminMddleware], errorHandler(updateProduct));
productsRoutes.delete('/:id', [authMiddleware, adminMddleware], errorHandler(deleteProduct));
productsRoutes.get('/', [authMiddleware, adminMddleware], errorHandler(listProduct));
productsRoutes.get('/:id', [authMiddleware, adminMddleware], errorHandler(getProductById));
productsRoutes.get('/search', [authMiddleware], errorHandler(searchProduct));


export default productsRoutes;