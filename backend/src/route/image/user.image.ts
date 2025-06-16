import express from "express"
import verifyUserAuthToken from "../../middleware/user-middleware/user.middleware"
import { deleteImage, getAllImagesOfUser, saveNewImage } from "../../controller/image/image.controller"

const imageRouter = express.Router()

imageRouter.get('/', verifyUserAuthToken, getAllImagesOfUser)

imageRouter.post('/new', verifyUserAuthToken, saveNewImage)

imageRouter.delete('/delete/:imageId', verifyUserAuthToken, deleteImage)


export default imageRouter