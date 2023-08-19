
import { Admin } from "../../models/admin.model.js";
import { compare, hesh } from "../../utilities/bcrypt.js";
import { sign } from "../../utilities/jwt.js";




export const Adminregister = async (req, res) =>{
    try {
        const {username , password} = req.body

        const user = await Admin.findOne({username})

        if(user){
            res.status(404).json("Username foydalinilgan")
        }else{
            const heshPassword = await hesh(password)

        await Admin.create({username:username, password:heshPassword})
        res.status(200).json({message:"Admin royhatdan otdi"})
        }

    } catch (error) {
        res. status(500).json({message:error.message})
    }
}

export const Adminlogin = async (req, res) => {
    try {
        const {username, password } = req.body
        const user = await Admin.findOne({username})
        if(!user){
            res.status(404).json("user account not found")
        }else{
            const check = await compare(password, user.password)
            if(check){
                const token =  await sign(user.id)
                res.cookie('token', token)
            res.status(200).json({message:"You are successfully logged in", token})
            }
        }
    } catch (error) {
        res. status(500).json({message:error.message})
        
    }
}


export const Adminlogout = async (req, res) => {
    try {
        res.cookie('token', '')
        res.status(200).json({message:"Tizimdan chiqildi"})
    } catch (error) {
        res. status(500).json({message:error.message})
        
    }
}

