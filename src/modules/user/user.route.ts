import { Router } from "express";
import { getAllUsers, getSingleUser, registerUser } from "./user.controller";

const userRoute = Router()
userRoute.post("/user",registerUser)
userRoute.get("/users",getAllUsers)
userRoute.get("/users/:id",getSingleUser)
export default userRoute