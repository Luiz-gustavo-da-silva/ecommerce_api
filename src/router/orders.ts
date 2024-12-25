import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrder, listUserOrders } from "../controllers/orders";
import { adminMddleware } from "../middlewares/admin";

const orderRoutes: Router = Router();

orderRoutes.post('/', [authMiddleware], errorHandler(createOrder));
orderRoutes.get('/', [authMiddleware], errorHandler(listOrder));
orderRoutes.put('/:id/cancel', [authMiddleware], errorHandler(cancelOrder));
orderRoutes.get('/index', [authMiddleware, adminMddleware], errorHandler(listAllOrders));
orderRoutes.get('/users/:id', [authMiddleware, adminMddleware], errorHandler(listUserOrders));
orderRoutes.get('/:id/status', [authMiddleware, adminMddleware], errorHandler(changeStatus));
orderRoutes.get('/:id', [authMiddleware], errorHandler(getOrderById));


export default orderRoutes;