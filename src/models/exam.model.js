import { Schema, model } from "mongoose";


const ExamSchema = new Schema({
    groupId:{
        type:Schema.Types.ObjectId,
        required:true
        
    },
    startDateTime: {
        date: String,
        time: String,
      },
      endDateTime: {
        date: String,
        time: String,
      },

},
{
    timestamps: true
})

export const Exam = model('Exam', ExamSchema);