import { Router } from 'express';
import UserInventoryModel from '../models/UserInventoryModel';

const inventoryRouter = Router();

// Rota para buscar o inventário do usuário por userId
inventoryRouter.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userInventory = await UserInventoryModel.findOne({ userId });

        if (!userInventory) {
            return res.status(404).json({ error: 'Inventário do usuário não encontrado.' });
        }

        res.json(userInventory);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar inventário do usuário.' });
    }
});

// Rota para adicionar um item ao inventário do usuário
inventoryRouter.post('/add', async (req, res) => {
    try {
        const { userId, itemId, resourceName, img_url, quantity } = req.body;
        const userInventory = await UserInventoryModel.findOne({ userId });

        if (!userInventory) {
            return res.status(404).json({ error: 'Inventário do usuário não encontrado.' });
        }

        const existingItem = userInventory.items.find((item) => item.itemId.toString() === itemId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            userInventory.items.push({ itemId, resourceName, img_url, quantity });
        }

        await userInventory.save();
        res.json(userInventory);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar item ao inventário.' });
    }
});

// Rota para remover um item do inventário do usuário
inventoryRouter.post('/remove', async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;
        const userInventory = await UserInventoryModel.findOne({ userId });

        if (!userInventory) {
            return res.status(404).json({ error: 'Inventário do usuário não encontrado.' });
        }

        const existingItem = userInventory.items.find((item) => item.itemId.toString() === itemId);
        if (existingItem) {
            existingItem.quantity -= quantity;
            if (existingItem.quantity <= 0) {
                userInventory.items = userInventory.items.filter((item) => item.itemId !== itemId);
            }
        }

        await userInventory.save();
        res.json(userInventory);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover item do inventário.' });
    }
});

export default inventoryRouter;