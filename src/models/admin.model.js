import { Schema , model } from "mongoose";

const AdminSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})


export const Admin = model("Admin", AdminSchema)