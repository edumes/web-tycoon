import { Router } from 'express';
import UserInventoryModel from '../models/UserInventoryModel';

const tradeRouter = Router();

// Rota para vender minérios
tradeRouter.post('/sell', async (req, res) => {
    try {
        const userId = req.body.id; // Você deve ter um sistema de autenticação para obter o ID do jogador
        const { itemsToSell } = req.body; // Receba os minérios que o jogador deseja vender

        const userInventory = await UserInventoryModel.findOne({ userId });

        if (!userInventory) {
            return res.status(404).json({ error: 'Inventário do jogador não encontrado.' });
        }

        // Verifique se o jogador possui os minérios que deseja vender e se a quantidade é válida

        for (const { itemId, quantity } of itemsToSell) {
            const existingItem = userInventory.items.find((item) => item.itemId === itemId);

            if (!existingItem || existingItem.quantity < quantity) {
                return res.status(400).json({ error: 'Minérios insuficientes para venda.' });
            }

            // Calcule o valor da venda com base no valor do minério
            const totalValue = calculateSaleValue(itemId, quantity);

            // Atualize o inventário do jogador e o saldo de dinheiro
            existingItem.quantity -= quantity;
            // Atualize o saldo do jogador com o valor da venda
            // Lembre-se de implementar esta lógica no seu jogo
        }

        await userInventory.save();
        // Atualize o saldo do jogador no banco de dados

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao vender minérios.' });
    }
});

// Função para calcular o valor da venda com base no valor do minério (para simulação)
function calculateSaleValue(itemId: string, quantity: number) {
    // Aqui você pode implementar uma lógica real para calcular o valor da venda com base no mercado intergaláctico.
    // Por enquanto, vou usar um valor fixo para simulação.
    const fixedValue = 5; // Valor fictício por unidade
    return fixedValue * quantity;
}

export default tradeRouter;