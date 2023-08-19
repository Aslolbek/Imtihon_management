import { Router } from "express";
import {Adminlogin, Adminlogout, Adminregister} from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

export const router = Router()




router.post("/admin/register", Adminregister)
router.post("/admin/login", Adminlogin)

router.get("/admin/logout",isAdmin, Adminlogout)




