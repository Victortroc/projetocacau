import { Router } from "express";
import { DepositController } from "../controllers";

const depositRoutes = Router();


depositRoutes.get("/deposit", DepositController.getAllValidation, DepositController.getAll);

depositRoutes.get("/deposit/:id", DepositController.getByIdValidation, DepositController.getById);

depositRoutes.post("/deposit",
    DepositController.createValidation, 
    DepositController.create
);

depositRoutes.put("/deposit/:id", DepositController.putByIdValidation, DepositController.putById);

depositRoutes.delete("/deposit/:id", DepositController.deleteByIdValidation, DepositController.deleteById);


export default depositRoutes;
