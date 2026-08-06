import { asyncHandler } from "../utils/asyncHandler";

const regUser = asyncHandler(async (req , res)=> {
    res.status(200).json(
        {
            message: "OK"
        }
    )
})