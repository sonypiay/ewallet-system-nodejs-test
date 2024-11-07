class ErrorException extends Error 
{
    constructor(message, statusCode) 
    {
        super(message);
        this.statusCode = statusCode ?? 500;
    }

    render(response) {
        response.status(this.statusCode).json({
            status: "error",
            message: this.message,
        }).end();
    }
}

export default ErrorException;