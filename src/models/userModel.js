import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    isactive:{
        type:Number,
        default:1
    },
    profile:{
        data:Buffer,
        type:String,
        
    }
},{timestamps:true})

 export default mongoose.model("User",userSchema)