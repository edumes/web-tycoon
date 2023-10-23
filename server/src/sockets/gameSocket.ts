import { Server as SocketIOServer, Socket } from 'socket.io';

const configureGameSocket = (io: SocketIOServer): void => {
    io.on('connection', (socket: Socket) => {
        console.log('Nova conexão Socket.io:', socket.id);

        // Lógica de manipulação de eventos em tempo real
        socket.on('moveSpaceship', (data) => {
            // Lógica para movimentar naves espaciais
            io.emit('spaceshipMoved', data); // Emita o evento para todos os clientes
        });

        // Outros manipuladores de eventos
    });
};

export default configureGameSocket;