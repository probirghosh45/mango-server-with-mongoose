import { Router } from "express";
import { registerUser } from "./user.controller";

const userRoute = Router()
userRoute.post("/user",registerUser)
export default userRoute