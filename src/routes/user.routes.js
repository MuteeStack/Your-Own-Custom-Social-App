import { Router } from "express";
import { regUser , loginUser , logoutUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(
    upload.fields([ 
        {
            name: "avator",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    regUser)
router.route("/loggin").post(loginUser)

router.route("/logout").post(logoutUser)
export default router
