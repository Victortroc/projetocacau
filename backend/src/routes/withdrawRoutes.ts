import { Router } from "express";
import { WithdrawController } from "../controllers";


const withDrawRoutes = Router();

withDrawRoutes.get("/withdraw", WithdrawController.getAllValidation, WithdrawController.getAll);

withDrawRoutes.get("/withdraw/:id", WithdrawController.getByIdValidation, WithdrawController.getById);

withDrawRoutes.post("/withdraw",
    WithdrawController.createValidation, 
    WithdrawController.create
);

withDrawRoutes.put("/withdraw/:id", WithdrawController.putByIdValidation, WithdrawController.putById);

withDrawRoutes.delete("/withdraw/:id", WithdrawController.deleteByIdValidation, WithdrawController.deleteById);


export default withDrawRoutes;
