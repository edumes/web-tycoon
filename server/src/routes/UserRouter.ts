import { Router, Request, Response } from 'express';
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import UserInventoryModel from '../models/UserInventoryModel';
import { isAuthenticated } from '../middleware/isAuthenticated';
import mongoose from 'mongoose';

const userRouter = Router();

userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Nome de usuário já está em uso.' });
        }

        const userId = new mongoose.Types.ObjectId();
        const userInventory = new UserInventoryModel({ userId });
        await userInventory.save();

        const hashedPassword = await hash(password, 8);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            inventoryId: userInventory._id,
        });

        const savedUser = await newUser.save();

        res.json({ success: true, savedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a conta.' });
    }
});

userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.' });
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const token = sign(
            {
                name: username,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user._id.toString(),
                expiresIn: '30d'
            }
        )

        res.json({ success: true, _id: user._id, email: user.email, username, inventoryId: user.inventoryId, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
});

userRouter.get('/details', isAuthenticated, async (req: Request, res: Response) => {
    try {
        const user_id = req.user_id;

        const user = await UserModel.findById(user_id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar informações do usuário.' });
    }
});

export default userRouter;