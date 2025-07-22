import { Request, Response } from "express";
import Mango from "./mango.model";

const createMango = async (req: Request, res: Response) => {
  const payload = req.body;
  const mango = new Mango(payload);
  const mangoData = await mango.save();

  res.send({
    success: true,
    messsage: "Mango created successfully",
    mangoData,
  });
};

export {createMango}