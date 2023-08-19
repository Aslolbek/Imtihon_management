import { Schema, model } from "mongoose";
// import mongoose from "mongoose";


const studentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type:String
    },
    fristname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    groupId: {type: Schema.Types.ObjectId, ref: "Group"} 
}, 
{
    timestamps: true
})

export const student = model('student', studentSchema);
