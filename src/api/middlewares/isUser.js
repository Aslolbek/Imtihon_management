import { student } from "../../models/student.model.js";
import { verify } from "../../utilities/jwt.js";


export async function isUser(req, res, next) {
    try {
        const { token } = req.cookies;
        if(!token) return res.status(400).json({message:"Token mavjud emas login qilinishi kerak"})

        const userId = await verify(token)
        if(!userId){
            return res.status(200).json({message:"user login qilinmagan"})
        }else{
           const user = await student.findById(userId);
    
        if(!user) return res.status(400).json({message:"Siz login qilmadingiz"})
        req.user = user; 
        next(); 
        }
        
    } catch(error){

        res.status(500).json({message:error.message})
    }
}