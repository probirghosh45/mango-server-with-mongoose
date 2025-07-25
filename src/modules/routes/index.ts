import { Router } from "express";
import userRoute from "../user/user.route";
import mangoRoute from "../mango/mango.route";


const routes = Router();
routes.use("/user",userRoute)
routes.use("/mango",mangoRoute)

export default routes;

