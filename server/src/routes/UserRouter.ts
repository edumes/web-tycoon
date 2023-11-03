import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import UserInventoryModel from '../models/UserInventoryModel';
import authenticateUser from '../middleware/authenticationMiddleware';
import mongoose from 'mongoose';

const userRouter = Router();

function generateToken(userId: string) {
    const token = jwt.sign({ userId }, 'web-tycoon');
    return token;
}

userRouter.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Nome de usuário já está em uso.' });
        }

        const userId = new mongoose.Types.ObjectId();
        const userInventory = new UserInventoryModel({ userId });
        await userInventory.save();

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            inventoryId: userInventory._id,
        });

        const savedUser = await newUser.save();
        const token = generateToken(savedUser._id);

        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a conta.' });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const token = jwt.sign({ userId: user._id }, 'web-tycoon');

        res.json({ success: true, _id: user._id, email: user.email, username, inventoryId: user.inventoryId, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
});

userRouter.get('/details/:userId', authenticateUser, async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar informações do usuário.' });
    }
});

export default userRouter;