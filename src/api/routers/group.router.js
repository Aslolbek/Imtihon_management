import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { GroupAll, GroupCreate, GroupDelete, GroupOne, StudentAddGroup, UpdateGroup } from "../controllers/group.controller.js";

export const router = Router()

//yaratilgan guruhlarni korish uchun faqat nomlari korinadi
router.get("/admin/GroupAll", isAdmin, GroupAll)

//Guruhga qoshilgan talabalarni ko'rish
router.get("/admin/GroupOne/:groupId", isAdmin, GroupOne)

//Guruh yaratish
router.post("/admin/Create/Group", isAdmin, GroupCreate)

//Guruhga va talabalarni qoshish(biriktirish)
router.post("/admin/Create/studentAddGroup", isAdmin, StudentAddGroup)



//Guruhni tahrirlash
router.put("/admin/GroupUpdate/:groupId", isAdmin, UpdateGroup)

//Guruhni o'chirish
router.delete("/admin/GroupDelete/:groupId",  isAdmin, GroupDelete)