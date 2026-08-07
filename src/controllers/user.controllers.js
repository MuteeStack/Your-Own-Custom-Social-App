import { asyncHandler } from "../utils/asyncHandler.js";

const regUser = asyncHandler(async (req , res)=> {

    // get user detail from frontend
    // validation (like if user send empty username or passowrd )
    // Check that if user already exsists
    // check the images and  avator but the cover is option but avator is must
    // upload avator on cloudinary , also check if uploaded
    // create user object // because we use object to send data to mongodb -- create an entry in mongodb
    // remove password and refreshtoken from the response 
    // check for the usercreation and the response 
    // return resp
    
})


export {regUser}