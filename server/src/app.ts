import express, { Express, Request, Response } from 'express';
import http from 'http';
import socketIO, { Server as SocketIOServer } from 'socket.io';
import { connectToMongo } from './config/mongo';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

import planetRouter from './routes/planetRouter';
import inventoryRouter from './routes/inventoryRouter';
import miningRouter from './routes/miningRouter';
import tradeRouter from './routes/tradeRouter';
import upgradesRouter from './routes/upgradesRouter';
import userRouter from './routes/UserRouter';

const app: Express = express();

const server: http.Server = http.createServer(app);
const io: SocketIOServer = new socketIO.Server(server);

connectToMongo();

app.use(express.json());

app.use(cors());

app.use('/api/inventory', inventoryRouter);
app.use('/api/planets', planetRouter);
app.use('/api/mine', miningRouter);
app.use('/api/trade', tradeRouter);
app.use('/api/upgrades', upgradesRouter);
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({ status: 'on' });
});

io.on('connection', (socket) => {
  console.log('Nova conexão Socket.io:', socket.id);

});

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});