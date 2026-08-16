import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

export const verfiyJWT = asyncHandler(async (req , res , next) => {   
    try {
         // if anything is not used we write it as _ like in this we are not using res so we write it as _
         const token = req.cookies?.accessToken || req.header("Autherization")?.replace("Bearer " , "")
    
         if(!token){
            throw new apiError(401 , "Unautherized Request")
         }

        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            // Will be discussed in the next video no # 16
            throw new apiError(401 , "Invalid access Token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new apiError(401 , error?.message || "Invalid Access Token")
    }
})