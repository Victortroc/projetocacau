import { Router } from "express";
import depositRoutes from "./depositRoutes";
import userRoutes from "./userRoutes";
import withDrawRoutes from "./withdrawRoutes";
import SessionRoutes from "./authRoutes";

const routes = Router();

routes.use(depositRoutes);
routes.use(userRoutes);
routes.use(withDrawRoutes);
routes.use(SessionRoutes);


export default routes;

