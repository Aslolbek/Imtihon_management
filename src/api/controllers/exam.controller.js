
import { Exam } from "../../models/exam.model.js";
import { studentAddGroup } from "../../models/studentAddGroup.modul.js";
import { PassedExam } from "../../models/passedExams.model.js";
import { Result } from "../../models/result.model.js";
import { checkTimeConflict } from "../middlewares/checkTimeConflict.js";


export const ExamCreate = async (req, res) =>{
    try {
        const {groupId, startDateTime, endDateTime } = req.body

        const group = await studentAddGroup.find({groupId:groupId})

        if(!group){
            res.status(405).json({message:"Group not found"})
        }else{


            const beforeExamTime = await Exam.findOne({groupId})


            if(beforeExamTime){
                const newExamTime ={startDateTime, endDateTime}
                const checkTime = await checkTimeConflict(beforeExamTime, newExamTime)
                if(checkTime){
                    return res.status(404).json({message:"Guruh uchun bu vaqtda imtihon mavjud siz bu vaqt oraligidan oldin yoki keyin imtihon qoya olasiz"})
                } 
                }

            function calculateHourDuration(startDateTime, endDateTime) {
                const start = new Date(`${startDateTime.date} ${startDateTime.time}`);
                const end = new Date(`${endDateTime.date} ${endDateTime.time}`);
                
                const timeDiffInMilliseconds = end - start;
                const hours = Math.floor(timeDiffInMilliseconds / (1000 * 60 * 60));
                
                return hours;
              }
              const hourDuration = calculateHourDuration(startDateTime, endDateTime);
    // //belgilangan vaqt oralig'i 1 soat va undan kop bolishi shart
              if(hourDuration>=1){
                await Exam.create({groupId, startDateTime, endDateTime })
            res.status(200).json({message:"Exam success"})
              }else if(hourDuration<1){
                res.status(404).json({message:"Siz Imtihonni oraliq vaqtini kamida 1 soat belgilashingiz kerak"})
              }



            
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


//imtihonni o'chirish
export const ExamDelete = async (req, res) =>{
    try {
        const {examId} = req.params
        await Exam.findByIdAndDelete(examId)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}


//imtihonni topshirgan talabalarni korish examId yordamida
export const Examspassed = async (req, res) => {
    try {
        const {examId} = req.params
        if(examId){
            const exam = await PassedExam.find({examId}).populate('studentId')

            res.status(200).json({message:"Topshirilgan talabalar", exam})
        } else {
            res.status(404).json({message:"Bu imtihonni hechkim topshirmagan"})

        }

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//baholash
export const evaluation = async (req, res) => {
    try {
       const  {examId, studentId, grade} = req.body
       let isActive = false;
       if(grade>=60){
        isActive=true
         await Result.create({examId, studentId, grade, isActive})
      return  res.status(200).json({message:"Success"})
       }else if(grade<=59){
        isActive=false
        await Result.create({examId, studentId, grade, isActive})
      return   res.status(200).json({message:"Success"})
       }

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}