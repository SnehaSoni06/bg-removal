import express from 'express'
import { removeBgImage } from '../controllers/ImageController.js'
import upload from '../middlewares/multer.js'
import authUser from '../middlewares/auth.js'

const imageRouter= express.Router()

imageRouter.post('/remove-bg',upload.single('image'),authUser,removeBgImage)  //need to link the api with frontend

export default imageRouter