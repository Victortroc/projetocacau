import { Router } from "express";
import depositRoutes from "./depositRoutes";
import userRoutes from "./userRoutes";
import withDrawRoutes from "./withdrawRoutes";

const routes = Router();

routes.use(depositRoutes);
routes.use(userRoutes);
routes.use(withDrawRoutes);

export default routes;

