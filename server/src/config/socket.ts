import { Server as SocketIOServer } from 'socket.io';

const configureSocketIO = (httpServer: any): SocketIOServer => {
    const io = new SocketIOServer(httpServer, {
        cors: {
            origin: '*:*',
        },
    });

    io.on('connection', (socket) => {
        console.log('Nova conexão Socket.io:', socket.id);

    });

    return io;
}

export { configureSocketIO };