import {v2 as cloudinary} from cloudinary
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_name,
    api_secret: process.env.cloud_name
})


const uploadFileInCloudinary = async function(filepath){
    try {
        const resp = await cloudinary.uploader.upload(filepath , {
            resource_type: auto
        })

        console.log(resp.url)
        return resp

    } catch (error) {
        fs.unlinkSync(filepath)
    }
}