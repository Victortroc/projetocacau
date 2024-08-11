import { Router } from "express";
import { UserController } from "../controllers";
import isAuth from "../middleware/isAuth";

const userRoutes = Router();


userRoutes.get("/user", isAuth, UserController.getAllValidation, UserController.getAll);

userRoutes.get("/user/:id", isAuth, UserController.getByIdValidation, UserController.getById);

userRoutes.put("/user/:id", isAuth, UserController.putByIdValidation, UserController.putById);

userRoutes.delete("/user/:id", isAuth, UserController.deleteByIdValidation, UserController.deleteById);


export default userRoutes;
