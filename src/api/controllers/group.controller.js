
import shortid from "shortid";
import { Admin } from "../../models/admin.model.js";
import { Group } from "../../models/group.model.js"
import { student } from "../../models/student.model.js";
import { compare, hesh } from "../../utilities/bcrypt.js";
import { sign } from "../../utilities/jwt.js";
import { Exam } from "../../models/exam.model.js";
import { studentAddGroup } from "../../models/studentAddGroup.modul.js";



export const GroupCreate = async (req, res) =>{
    try {
        const {name} = req.body
        const group = await Group.findOne({name})

        if(!group){
            await Group.create({name})
        res.send("ishladi")
        }else{
            res.status(405).json({message:"A group was created with the name"})
        }
        

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
};


export const StudentAddGroup = async (req, res) =>{
    try {
        const {groupId, studentId} = req.body
        const add = await studentAddGroup.findOne({groupId, studentId})
        if(add){
            return res.status(404).json({message:"Talaba guruhda oldindan mavjud"})
        }else{
           await studentAddGroup.create({groupId, studentId})
        res.status(200).json({message:"Guruhga talaba qo'shildi"}) 
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}



export const GroupAll = async (req, res) =>{
    try {
       const data = await Group.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
}



export const GroupOne = async (req, res) =>{
    try {
        const {groupId} = req.params

        const group = await studentAddGroup.find({groupId}).populate('studentId')
       
        if(!group){
            res.status(405).json({message:"Group not found"})
        }else{
            
            res.status(200).json({message:"Success", group})
        }
    } catch (error) {
       res.status(500).json({message:error.message})    
    }
}


export const UpdateGroup = async (req, res) =>{
    try {

        const {groupId} = req.params

        const {newname} = req.body

        const group = await Group.findById(groupId)

        if(group){
            await Group.findByIdAndUpdate(groupId,{$set: {name:`${newname}`}})
            res.status(200).json({message:'update success'})
        }else{
            res.status(405).json({message:'Group not found .Update failed!'})
        }

    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}



export const GroupDelete = async (req, res) =>{
    try {
        const {groupId} = req.params
        await Group.findByIdAndDelete(groupId)
        res.status(200).json({message:"DELETE Success"})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}