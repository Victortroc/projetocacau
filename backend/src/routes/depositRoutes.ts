import { Router } from "express";
import { DepositController } from "../controllers";
import isAuth from "../middleware/isAuth";
import isAdmin from "../middleware/isAdmin";

const depositRoutes = Router();


depositRoutes.get("/deposit", isAuth, isAdmin, DepositController.getAllValidation, DepositController.getAll);

depositRoutes.get("/deposit/:id", isAuth, isAdmin, DepositController.getByIdValidation, DepositController.getById);

depositRoutes.post("/deposit",
    isAuth,
    isAdmin,
    DepositController.createValidation, 
    DepositController.create
);

depositRoutes.put("/deposit/:id", isAuth, isAdmin, DepositController.putByIdValidation, DepositController.putById);

depositRoutes.delete("/deposit/:id", isAuth, isAdmin, DepositController.deleteByIdValidation, DepositController.deleteById);


export default depositRoutes;
