import { Schema, model } from "mongoose";

// Step 1: Interface define
interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "Admin" | "Customer";
}

// Step 2: Schema define
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      validate: {
        validator: (value: string) => {
          return /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: (props: any) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^(?:\+880|00880|0)1[0-9]{9}$/.test(v);
        },
        message: (props: any) =>
          `${props.value} is not a valid Bangladeshi phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: {
        values: ["Admin", "Customer"],
        message: "{VALUE} is not acceptable",
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Step 3: Model create & export
const User = model<IUser>("user", userSchema);
export default User;
