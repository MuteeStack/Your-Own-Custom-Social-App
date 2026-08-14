import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";


export const verfiyJWT = asyncHandler(async (req , res , next) => {   
     // if anything is not used we write it as _ like in this we are not using res so we write it as _
     const token = req.cookies?.accessToken || req.header("Autherization")?.replace("Bearer " , "")

     if(!token){
        throw new apiError(401 , "Unautherized Request")
     }
})