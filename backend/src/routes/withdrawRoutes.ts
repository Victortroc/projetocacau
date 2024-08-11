import { Router } from "express";
import { WithdrawController } from "../controllers";
import isAuth from "../middleware/isAuth";
import isAdmin from "../middleware/isAdmin";

const withDrawRoutes = Router();

withDrawRoutes.get("/withdraw", isAuth, WithdrawController.getAllValidation, WithdrawController.getAll);

withDrawRoutes.get("/withdraw/:id", isAuth, WithdrawController.getByIdValidation, WithdrawController.getById);

withDrawRoutes.post("/withdraw",
    isAuth,
    WithdrawController.createValidation, 
    WithdrawController.create
);

withDrawRoutes.put("/withdraw/:id", isAuth, isAdmin, WithdrawController.putByIdValidation, WithdrawController.putStatus);

withDrawRoutes.put("/withdraw-revert/:id", isAuth, isAdmin, WithdrawController.revertByIdValidation, WithdrawController.revertWithdraw);

withDrawRoutes.delete("/withdraw/:id", isAuth, WithdrawController.deleteByIdValidation, WithdrawController.deleteById);


export default withDrawRoutes;
