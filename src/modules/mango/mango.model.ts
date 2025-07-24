import { model, Schema } from "mongoose";
import { IMango } from "./mango.interface";

const mangoSchema = new Schema<IMango>(
  {
    name: {
      type: String,
      required: [true, "Mango name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [100, "Name must be at most 100 characters"],
    },
    varity: {
      type: String,
      required: [true, "Varity is required"],
      trim: true,
      minlength: [3, "Varity must be at least 3 characters"],
      maxlength: [100, "Varity must be at most 100 characters"],
    },
    unit: {
      type: String,
      enum: {
        values: ["KG", "TON"],
        message: "{VALUE} is not a valid unit",
      },
      required: [true, "Unit is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    origin: {
      type: String,
      required: [true, "Origin is required"],
      trim: true,
      minlength: [2, "Origin must be at least 2 characters"],
      maxlength: [100, "Origin must be at most 100 characters"],
    },
    season: {
      type: String,
      enum: {
        values: ["Summer", "Winter"],
        message: "{VALUE} is not a valid season",
      },
      required: [true, "Season is required"],
    },
  },
  { timestamps: true }
);

const Mango = model<IMango>("Mango", mangoSchema);
export default Mango;
