import { Router } from "express";
import { SessionController } from "../controllers";
import { UserController } from "../controllers";
import isAuth from "../middleware/isAuth";

const SessionRoutes = Router();


SessionRoutes.post("/login", SessionController.loginValidation, SessionController.store);

SessionRoutes.post("/signup",
    UserController.createValidation, 
    UserController.create
);

SessionRoutes.delete("/logout", isAuth, SessionController.remove);

export default SessionRoutes;