class apiResponse{
    constructor(statusCode , message , data){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.sucess = statusCode < 400
    }
}


export { apiResponse }