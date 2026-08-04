import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new mongoose.Schema({
        videoFile : {
            type: String,  // cloudinary
            required: true
        },
        Thumbnail : {
            type: String,  // cloudinary
            required: true
        },
        Title : {
            type: String,  
            required: true
        },
        Description : {
            type: String,
            required: true
        },
        Duration: {
            type: Number // cloudinary give's us duration as well
        },
        Owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        isPublished: {
            type: Boolean
        },
        views: {
            type: Number,
            default: 0
        }

} ,
{
    timestamps: true
})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model('Video' , videoSchema)