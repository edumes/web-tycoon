import { Request, Response, NextFunction } from 'express';

const handleErrors = (error: any, req: Request, res: Response, next: NextFunction) => {
    // Lógica para lidar com erros
    // Você pode formatar mensagens de erro, registrar informações de erro, etc.

    // Envie uma resposta de erro para o cliente
    res.status(500).json({ error: 'Ocorreu um erro interno do servidor.' });
};

export default handleErrors;