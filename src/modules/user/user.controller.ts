import { Request, Response } from "express";
import User from "./user.model";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // ✅ Step 1: Basic validation
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, phone, password, role) are required",
      });
    }

    // ✅ Step 2: Check for duplicate email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // ✅ Step 3: Check for duplicate phone number
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: "Phone number already exists",
      });
    }

    // ✅ Step 4: Create and save user
    const user = new User({ name, email, phone, password, role });
    const data = await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message || error,
    });
  }
};

export { registerUser };


