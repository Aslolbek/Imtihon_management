import bcrypt from "bcrypt"


export const hesh = async (malumot) =>{
    return await bcrypt.hash(malumot, 10)
 }
 export const compare = async (password, hechpassword) =>
 {
         return  await bcrypt.compare(password, hechpassword)   
 } 
 
 