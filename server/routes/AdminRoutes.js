import express from "express"
import { Router } from "express"
import { } from "../controller/admin.js"
import { conference } from "../controller/confrence.js"
const router = Router()

router.post('/createConference',conference)





export default router