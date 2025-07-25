import { Router } from "express";
import { getAllUsers, getSingleUser, registerUser } from "./user.controller";

const userRoute = Router()
userRoute.post("/",registerUser)
userRoute.get("/",getAllUsers)
userRoute.get("/:id",getSingleUser)
export default userRoute