import {Router}  from "express"
import { UpdatePassword, Userexams, Userlogin,  UserresultExam, UsersendtheExam } from "../controllers/user.controller.js"
import { isUser } from "../middlewares/isUser.js"


export const router = Router()

//Talaba uchun routerlar


//talaba login
router.post("/user/login", Userlogin)

//talaba uchun qoyilgan imtihonlarni korish
router.get("/user/exam", isUser, Userexams)

//talaba imtihonni topshirish uchun
router.post("/user/sendExam",isUser, UsersendtheExam)

//topshirilgan imtihonni natijasini bilish uchun
router.get("/user/result/:examId", isUser, UserresultExam)

//talaba o'zinig parolini o'zgartirish
router.put("/user/update", UpdatePassword)
