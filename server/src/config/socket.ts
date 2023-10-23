import { Server as SocketIOServer } from 'socket.io';

const configureSocketIO = (httpServer: any): SocketIOServer => {
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: '*:*', // Permitir todas as origens (mudar para a origem do seu jogo em produção)
        },
    });

    io.on('connection', (socket) => {
        console.log('Nova conexão Socket.io:', socket.id);
        // Implemente lógica de Socket.io aqui
    });

    return io;
}

export { configureSocketIO };