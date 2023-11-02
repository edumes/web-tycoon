import { Router } from 'express';
import authenticateUser from '../middleware/authenticationMiddleware';
import UserInventoryModel from '../models/UserInventoryModel';

const tradeRouter = Router();

// vender minérios
tradeRouter.post('/sell', authenticateUser, async (req, res) => {
    try {
        const userId = req.body.id;
        const { itemsToSell } = req.body;

        const userInventory = await UserInventoryModel.findOne({ userId });

        if (!userInventory) {
            return res.status(404).json({ error: 'Inventário do jogador não encontrado.' });
        }

        // Verifique se o jogador possui os minérios que deseja vender e se a quantidade é valida

        for (const { itemId, quantity } of itemsToSell) {
            const existingItem = userInventory.items.find((item) => item.itemId.toString() === itemId);

            if (!existingItem || existingItem.quantity < quantity) {
                return res.status(400).json({ error: 'Minérios insuficientes para venda.' });
            }

            // calcular o valor da venda com base no valor do minerio
            const totalValue = calculateSaleValue(itemId, quantity);

            existingItem.quantity -= quantity;
            // ataulizar o saldo do jogador com o valor da venda
        }

        await userInventory.save();

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao vender minérios.' });
    }
});

// calcular o valor da venda com base no valor do minério (para simulação)
function calculateSaleValue(itemId: string, quantity: number) {
    const fixedValue = 5;
    return fixedValue * quantity;
}

export default tradeRouter;