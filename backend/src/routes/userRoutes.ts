import { Router } from "express";
import { UserController } from "../controllers";

const userRoutes = Router();


userRoutes.get("/user", UserController.getAllValidation, UserController.getAll);

userRoutes.get("/user/:id", UserController.getByIdValidation, UserController.getById);

userRoutes.post("/user",
    UserController.createValidation, 
    UserController.create
);

userRoutes.put("/user/:id", UserController.putByIdValidation, UserController.putById);

userRoutes.delete("/user/:id", UserController.deleteByIdValidation, UserController.deleteById);


export default userRoutes;
