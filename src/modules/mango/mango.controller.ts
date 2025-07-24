import { Request, Response } from "express";
import Mango from "./mango.model";

const createMango = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body;
    const mango = new Mango(payload);
    const mangoData = await mango.save();

    res.status(201).json({
      success: true,
      message: "Mango created successfully",
      data: mangoData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create mango",
      error: (error as Error).message,
    });
  }
};

export { createMango };
