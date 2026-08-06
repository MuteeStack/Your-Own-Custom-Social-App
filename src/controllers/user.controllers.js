import { asyncHandler } from "../utils/asyncHandler.js";

const regUser = asyncHandler(async (req , res)=> {

    // get user detail from frontend
    // validation (like if user send empty username or passowrd like adding checks)
    // Check that user already exsists
    // check the images like the profile pic avator but the cover is option but avator is must so
    // upload avator on cloudinary , also check if uploaded
    // create user object // because we use object to send data to mongodb
    
})


export {regUser}