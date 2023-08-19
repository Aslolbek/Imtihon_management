
import shortid from "shortid";
import { student } from "../../models/student.model.js";
import { compare, hesh } from "../../utilities/bcrypt.js";

export const StudentCreate = async (req, res) =>{
    try {
        const {fristname, lastname} = req.body

        const username = await shortid.generate()
        const password = await shortid.generate()

        const heshPassword = await hesh(password)

        await student.create({fristname:fristname, lastname:lastname, username:username, password:heshPassword})

        res.status(200).json({student:`${fristname} ${lastname} `, username, password})

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}



export const studentOne = async (req, res) => {
    try {
        const {studentsId} = req.params

        const data = await student.findById(studentsId)

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}


//UPDATE
export const UpdateStudent = async (req, res) =>{
    try {

        const {studentId} = req.params

        const {fristname, lastname} = req.body

        await student.findByIdAndUpdate(studentId, {$set:{fristname, lastname}})

        res.status(200).json({message:"Student information updated"})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//DELETE
export const StudentDelete = async (req, res) =>{
    try {
        const {studentId} = req.params

        await student.findByIdAndDelete(studentId)

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}


