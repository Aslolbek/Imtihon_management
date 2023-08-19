import {Router} from "express"
import { isAdmin } from "../middlewares/isAdmin.js"
import { StudentCreate, StudentDelete, UpdateStudent, studentOne } from "../controllers/student.controller.js"

export const router = Router()


//o'quvchini olish
router.get("/admin/studentOne/:studentsId", isAdmin, studentOne)

//o'quvchini registratsiya qilish
router.post("/admin/Create/student", isAdmin, StudentCreate)

//talabani tahrirlash
router.put("/admin/StudentUpdate/:studentId", isAdmin, UpdateStudent)

//talabani o'chirish
router.delete("/admin/StudentDelete/:studentId", isAdmin, StudentDelete)

