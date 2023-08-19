

import { Exam } from "../../models/exam.model.js"
import { PassedExam } from "../../models/passedExams.model.js"
import { student } from "../../models/student.model.js"
import { studentAddGroup } from "../../models/studentAddGroup.modul.js"
import { compare, hesh } from "../../utilities/bcrypt.js"
import { sign, verify } from "../../utilities/jwt.js"
import {v4 as uuid} from "uuid"
import { getExamStatus } from "../middlewares/getExamStatus.js"
import { Result } from "../../models/result.model.js"

export const Userlogin = async (req, res) =>{
    try {

        const {username, password} = req.body

        const user = await student.findOne({username})

        if(!user){
            return res.status(405).json({message:"User not found"})
        }
        console.log(user);
        const check = await compare(password, user.password)

        if(check){

            const token = await sign(user.id)
            res.cookie('token', token)

           return res.status(200).json({message: "You are logged in!"})
        }else{
           return res.status(405).json({message: "password error"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


export const Userexams = async (req, res)  =>{
    try {
        
        const {token} = req.cookies

        const id = await verify(token)

        const user = await studentAddGroup.findOne({studentId:id})

        if(!user){
            res.status(200).json({message:"The user has not joined the group"})
        }else{
            const exam = await Exam.findOne({groupId:user.groupId})
        if(!exam){
        res.status(200).json({message:"sizda mavjud emas"})
        }else{
            res.status(200).json({message:"sizda mavjud imtihonlar", exam})
        }
        }
    } catch(error) {
        res.status(500).json({message:error.message})
        
    }
}



export const UsersendtheExam = async (req, res, next) => {
    try {
        const {examId} = req.body
        const {token} = req.cookies
        const {file} = req.files
        
        const studentId = await verify(token)

        if(file && examId){
            const SubmittedBefore = await PassedExam.findOne({examId, studentId})

            if(SubmittedBefore){
                return res.status(200).json({message:"siz imtihoni topshirgansiz"})
            }

            const exam = await Exam.findById(examId)

            const result = `${uuid()}.${file.mimetype.split("/")[1]}`;
    
    const examStatus =await getExamStatus(exam);

    if(examStatus=="started"){
    file.mv(process.cwd() + "/uploads/" + result);
    await PassedExam.create({examId, studentId ,result})
    res.status(200).json({message:"Imtihon Yuklandi"})
    
    }else if(examStatus==='notStarted'){
    res.status(200).json({message:"Imtihon hali boshlanmagan"})
    }else if(examStatus==="TimeisUp"){
    res.status(200).json({message:"Imtihon vaqti o'tib ketgan"})
    }        

                
}else{
    res.status(405).json({message:"file yoki examId da hatolik mavjud"})
}
    } catch (error) {

        res.status(500).json({message:error.message})
    }
}


export const UserresultExam = async (req, res) => {
    try {

        const {examId} = req.params
        const {token} = req.cookies
        const studentId = await verify(token)
        const natija = await Result.findOne({examId, studentId}).populate('studentId')
        if(natija){
            res.status(200).json({message1:"Imtihon", natija})
        }else{
            res.status(404).json({message1:"Imtihon Natijalar yo'q"})

        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}


export const UpdatePassword = async (req, res) => {
    try {
        const {password, newpassword} = req.body

        const {token} = req.cookies

        const userId = await verify(token)

        const user = await student.findById(userId)

        const check = await compare(password, `${user.password}`)
       
        if(check) {
            const heshPassword = await hesh(newpassword)

            await student.findByIdAndUpdate(userId, {$set: {password:heshPassword}})

            return res.status(200).json({message:"Password changed successfully"})
        }else{
            return res.status(404).json({message:"the password is not correct. Check and try again!"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}




