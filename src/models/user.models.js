import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avator: {
        type: String, // cloudinary url
        required: true
    },
    coverimage: {
        type: String // cloudinary url
    },
    watchHistory : [
        {
            type = mongoose.Schema.Types.ObjectId,
            ref = "Videos"
        }
    ],
    password: {
        type: String,
        required: [true , "Password is required"]
    },
    refreshTokens: {
        type: String
    }
} , {
    timestamps: true
})


export const User = mongoose.model("User" , userSchema)