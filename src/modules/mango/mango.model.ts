import { model, Schema } from "mongoose";

const mangoSchema =  new Schema<IMango>({
    name : {type : String , required :  true , trim : true , min : 3 , max : 100},
    varity : {type : String , required :  true , trim : true , min : 3 , max : 100},
    unit : {
        type : String,
        enum :{
            values : ["KG","TON"],
            message : "{VALUE} is not acceptable"
        },
        required : true
    },
    price : {type : Number , required : true , min : 0 },
    stock : {type : Number , required : true , min : 0},
    origin : {type : String , required : true , min : 0 },
    season : {
        type : String,
        enum : {
            values : ["Summer","Winter"],
            message : "{VALUE} is not acceptable"
        }
    },
},
  {timestamps : true}
);

const Mango = model<IMango>("mango",mangoSchema)
export default Mango;



