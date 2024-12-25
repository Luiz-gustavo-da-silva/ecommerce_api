import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import { addAddress, changeUserRole, deleteAddress, getUserById, listAddress, listUsers, updateAddress } from "../controllers/users";
import { adminMddleware } from "../middlewares/admin";

const usersRoutes: Router = Router();

usersRoutes.post('/address', [authMiddleware], errorHandler(addAddress));
usersRoutes.delete('/address/:id', [authMiddleware], errorHandler(deleteAddress));
usersRoutes.get('/address', [authMiddleware], errorHandler(listAddress));
usersRoutes.put('/', [authMiddleware], errorHandler(updateAddress));
usersRoutes.put('/role', [authMiddleware, adminMddleware], errorHandler(changeUserRole));
usersRoutes.get('/', [authMiddleware,adminMddleware], errorHandler(listUsers));
usersRoutes.get('/:id', [authMiddleware, adminMddleware], errorHandler(getUserById));

export default usersRoutes;