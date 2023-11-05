import { Router, Request, Response } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import UserInventoryModel from '../models/UserInventoryModel';

const inventoryRouter = Router();

inventoryRouter.get('/:userId', isAuthenticated, async (req: Request, res: Response) => {
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

// adicionar um item ao inventário do usuário
inventoryRouter.post('/add', isAuthenticated, async (req: Request, res: Response) => {
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

// remover um item do inventário do usuário
inventoryRouter.post('/remove', isAuthenticated, async (req: Request, res: Response) => {
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