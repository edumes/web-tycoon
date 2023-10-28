import { Router } from 'express';
import UserModel from '../models/UserModel';
import UserInventoryModel from '../models/UserInventoryModel';

const userRouter = Router();

// Rota para criar um novo usuário
userRouter.post('/create', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verifique se o usuário com o mesmo e-mail já existe
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Usuário já registrado.' });
        }

        // Crie um novo usuário
        const newUser = new UserModel({ username, password });

        // Crie um inventário vazio para o novo usuário
        const userInventory = new UserInventoryModel({ userId: newUser._id });

        // Associe o inventário ao usuário
        newUser.inventoryId = userInventory._id;

        await newUser.save();
        await userInventory.save();

        res.json({ success: true, user: newUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao criar o usuário.' });
    }
});

// Rota para obter informações do usuário por ID
userRouter.get('/info/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Busque informações do usuário por ID
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar informações do usuário.' });
    }
});

export default userRouter;