import {Schema, model} from "mongoose"

const passedExamSchema = new Schema({
    examId:{
        type:Schema.Types.ObjectId, ref:'Exam'
    },
    studentId:{
        type:Schema.Types.ObjectId, ref:'student'
    },
    result:{
        type:String
    }
}, 
{
    timestamps: true
})

export const PassedExam = model("PassedExam",  passedExamSchema)