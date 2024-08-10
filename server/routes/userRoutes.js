import express from "express"
import { Router } from "express"
import { register, login, forgetPassword ,details} from "../controller/user.js"
import { all } from "../controller/confrence.js"

const router = Router()

router.post('/register',  register)
router.post('/login',login)
router.post('/forgetPassword',forgetPassword)
router.get('/getdetails',details)
router.get('/getconferences',all)





export default router