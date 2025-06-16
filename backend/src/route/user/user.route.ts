import express from "express"
import { createNewUser, userLogin } from "../../controller/user/user.controller"

const userRouter = express.Router()

userRouter.post('/create-new', createNewUser)
userRouter.post("/login", userLogin)

export default userRouter