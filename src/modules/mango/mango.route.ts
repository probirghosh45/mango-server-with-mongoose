import { Router } from "express";
import { createMango } from "./mango.controller";


const mangoRoute = Router()
mangoRoute.post("/mango",createMango)
export default mangoRoute ;