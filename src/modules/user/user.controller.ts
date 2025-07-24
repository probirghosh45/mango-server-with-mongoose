import { Request, Response } from "express";
import { userValidationSchema } from "./user.validation";
import User from "./user.model";
import bcrypt from "bcrypt";

const registerUser = async (req: Request,res : Response)=>{
  
  try {
      // step 1 : Validate input using Joi
     const {error} =  userValidationSchema.validate(req.body)
     if(error){
      return res.status(400).json({
        success: false,
        message : error.details[0].message
      })
     }
       const {name,email,phone,password,role} = req.body

       //step 2 : check duplicate email
       const existingEmail = await User.findOne({email});
       if (existingEmail) {
        return res.status(409).json({
          success : false,
          message : "Email already exists"
        })
       }

       // step 3 : check duplicate phone

       const exsitingPhone = await User.findOne({phone});
       if(exsitingPhone){
        return res.status(409).json({
          success : false,
          message : "Phone number already exists"
        })
       }

       // step 4 : Hash password using bcrypt
       const hashPassword = await bcrypt.hash(password,10)

       //step 5 : Create and Save user -
       const user = new User({
        name,
        email,
        phone,
        password : hashPassword,
        role
       })

       const data = await user.save()

       //step 6 : Return response
       return res.status(201).json({
        success : true,
        message : "User registered successfully",
        data
       })

  } 
  
  catch (err : any) {
    console.error("Error during user registration",err)
    return res.status(500).json({
      success : false,
      message : "Something went wrong while registering user",
      error : err.message || err
    })
    
  }
}

// 🔹 Get all users
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: (error as Error).message,
    });
  }
};

// 🔹 Get single user by ID
const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: (error as Error).message,
    });
  }
};

export {registerUser,getAllUsers,getSingleUser}

