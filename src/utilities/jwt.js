import jwt from "jsonwebtoken";
import  {config}  from "../../config/index.js";

export const sign = async (payload) =>{
    return await jwt.sign(payload, config.KEY)
}  
export const verify = async (payload) =>{    
       return  await jwt.verify(payload, config.KEY)  
} 

