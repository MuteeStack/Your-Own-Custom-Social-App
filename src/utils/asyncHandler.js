const asyncHandler = (fun) => async () => {
    await fun(req , res , next)
}