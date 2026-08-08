import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadFileInCloudinary = async function(filepath){
    try {
        const resp = await cloudinary.uploader.upload(filepath , {
            resource_type: "auto"
        })

        console.log(resp.url)
        fs.unlinkSync(filepath)
        return resp

    } catch (error) {
        fs.unlinkSync(filepath)
    }
}


export {uploadFileInCloudinary}