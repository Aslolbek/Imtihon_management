import { Schema, Types, model } from "mongoose";

const resultSchema = new Schema({
    examId :{
        type:Schema.Types.ObjectId, ref:'Exam'
    },
    studentId:{
        type:Schema.Types.ObjectId, ref:'student'
    },
    grade :{
        type:String
    },
    isActive:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true
})


export const Result = model("Result", resultSchema)