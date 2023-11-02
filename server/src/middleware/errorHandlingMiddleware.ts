import { Request, Response, NextFunction } from 'express';
export class CustomError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

const handleErrors = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);

    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Internal error server' });
    }
};

export default handleErrors;