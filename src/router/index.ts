import { Router } from "express";
import authRoutes from "./auth";
import usersRoutes from "./users";
import cartRoutes from "./cart";
import productsRoutes from "./products";
import orderRoutes from "./orders";

const rootRouter: Router = Router()

rootRouter.use('/auth', authRoutes)
rootRouter.use('/products', productsRoutes)
rootRouter.use('/users', usersRoutes)
rootRouter.use('/cart', cartRoutes)
rootRouter.use('/orders', orderRoutes)


export default rootRouter