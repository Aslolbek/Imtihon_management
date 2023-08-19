import { Router } from "express";
import { ExamCreate, ExamDelete,  Examspassed, evaluation} from "../controllers/exam.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

export const router = Router()

//Imtihon yaratish
router.post("/admin/Create/exam", isAdmin, ExamCreate)

//Imtihonni yakunlash o'chirish
router.delete("/admin/GroupDelete/:examId", isAdmin, ExamDelete)

//Topshirilgan imtihon talabalarini topshiriqlarini olish
router.get("/admin/viewsExams/:examId", isAdmin, Examspassed)

//baholash
router.post("/admin/result", isAdmin, evaluation)

