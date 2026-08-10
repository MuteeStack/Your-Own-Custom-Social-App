import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js"
import {apiError as ApiError} from "../utils/apiError.js"
import {uploadFileInCloudinary} from "../utils/cloudinary.js"
import {apiResponse} from "../utils/apiResponse.js"
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

    const {userName , email , fullName , password} = req.body
    console.log(req.body)

    if([userName , email , fullName , password].some((fields)=>fields?.trim() === "")){
        throw new ApiError(400 , "All fields are required")
    }

    const existedUser = await User.findOne({
        $or : [{userName} , {email}]
    })

    if(existedUser){
        throw new ApiError(409 , "User already exsisted")
    }
    console.log(req.files)
    const avatorLocalPath = req.files?.avator?.[0]?.path

    // const imageLocalPath = req.files?.coverImage?.[0]?.path

    if(!avatorLocalPath){
        throw new ApiError(400 , "Avator is must required")
    }

    let imageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        imageLocalPath = req.files.coverImage[0].path
    }

    const avator = await uploadFileInCloudinary(avatorLocalPath)

    const coverImage = imageLocalPath ? await uploadFileInCloudinary(imageLocalPath) : null

    if(!avator){
        throw new ApiError(400 , "Avator is required")
    }
    
    const user  = await User.create({
        fullName,
        avator: avator.url,
        coverImage: coverImage?.url || "",
        email,
        userName: userName.toLowerCase(),
        password
    })
    const createdUser = await User.findById(user._id).select("-password -refreshTokens")

    if(!createdUser){
        throw new ApiError(500 , "Server Error while registering")
    }

    return res.status(200).json(new apiResponse(200, createdUser , "User created sucessfully"))
})


export {regUser}




