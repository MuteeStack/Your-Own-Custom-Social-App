const asyncHandler = (fun) => async (req , res , next) => {
   try {
        await fun(req , res , next)
   } catch (error) {
        res.status(error.code || 500).json({
        sucess: false,
        message: error.message
    })
   }
}

export {asyncHandler}