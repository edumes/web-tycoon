// Importe os módulos necessários
import express, { Express, Request, Response } from 'express';
import http from 'http';
import socketIO, { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';

// Importe as rotas da API
import planetRouter from './routes/planetRouter';
import inventoryRouter from './routes/inventoryRouter';
import miningRouter from './routes/miningRouter';
import tradeRouter from './routes/tradeRouter';
import upgradesRouter from './routes/upgradesRouter';

// Configure o Express
const app: Express = express();

// Configure o servidor HTTP para Socket.io
const server: http.Server = http.createServer(app);
const io: SocketIOServer = new socketIO.Server(server);

// Conexão com o MongoDB
const dbURI: string = 'mongodb://localhost:27017/tycoonGame'; // Substitua pelo URI do seu banco de dados
mongoose.connect(dbURI);

// Middleware para analisar JSON
app.use(express.json());

// Configure as rotas da API
app.use('/api/inventory', inventoryRouter);
app.use('/api/planets', planetRouter);
app.use('/api/mining', miningRouter);
app.use('/api/trade', tradeRouter);
app.use('/api/upgrades', upgradesRouter);

// Rota de exemplo
app.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo ao Tycoon Game API!');
});

// Configurar o Socket.io
io.on('connection', (socket) => {
  console.log('Nova conexão Socket.io:', socket.id);

  // Implemente a lógica de Socket.io aqui para atualizações em tempo real do jogo
});

// Porta em que o servidor irá ouvir
const port: number = 3000; // Substitua pela porta desejada

// Inicie o servidor
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});