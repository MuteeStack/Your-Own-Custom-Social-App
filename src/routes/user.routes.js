import { Router } from "express";
import { regUser , loginUser , logoutUser , refreshAccessToken } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verfiyJWT } from "../middlewares/auth.middleware.js";

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
router.route("/login").post(loginUser)


// secured route
router.route("/logout").post(verfiyJWT , logoutUser)
router.route("/refresh-access").post(refreshAccessToken)
export default router
