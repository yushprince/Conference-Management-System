import express from "express"
import { Router } from "express"
import AdminRoutes from "./AdminRoutes.js"
import UserRoutes from "./userRoutes.js"
const router = Router()

router.use("/user",UserRoutes)
router.use("/admin",AdminRoutes)



export default router