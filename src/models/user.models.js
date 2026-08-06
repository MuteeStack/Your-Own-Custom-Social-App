import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

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


//we don't use call back arrow function here because it don't takes context here it is important that we must have context so that's why we use 
//the normal function
// we use async await here because encrypting password takes some time 

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
        this.password = bcrypt.hash(this.password , 10)
        next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password , this.password)
}


userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id : this._id,
        userName: this.userName,
        fullname: this.fullname,
        email : this.email
    } ,
    process.env.ACCESS_TOKEN_SECRET
    ,{
      expiresIn:  process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id : this._id
    } ,
    process.env.REFRESH_TOKEN_SECRET
    ,{
      expiresIn:  process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User" , userSchema)


// mongoose aggregation pipeline is the main powerhouse of the mongodb it came late so we use it as a pluggin in our app
// we will use plugin hook it act as a pre hook 

// we will use pre hook in mongodb because it asks what to do before stroing data
// bcrypt used for password encryption and decryption
// jsonwebtoken

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password , 10)
    next()
})
