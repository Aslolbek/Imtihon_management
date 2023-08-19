import { Admin } from "../../models/admin.model.js";
import { verify } from "../../utilities/jwt.js";


export const isAdmin = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) return res.status(400).json({message:"Token mavjud emas login qilinishi kerak"})

        const adminId = await verify(token);
        if(!adminId){
            return  res.status(405).json({message:"user login qilinmagan"})
        }else{
            const admin =  await Admin.findById(adminId)
        if(!admin){
            return res.status(400).json({message:"Siz login qilmadingiz"})
        }
        }
        next()
             
    } catch (error) {
        res. status(500).json({message:error.message})
        
    }
}