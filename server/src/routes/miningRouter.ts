import { Router } from 'express';
import UserInventoryModel from '../models/UserInventoryModel';

const miningRouter = Router();

// Rota para a mineração em um planeta
miningRouter.post('/mine/:planetId', async (req, res) => {
    try {
        const { planetId } = req.params;
        const userId = req.user.id; // Você deve ter um sistema de autenticação para obter o ID do jogador

        // Verifique se o jogador possui permissão para minerar neste planeta
        // Isso pode incluir verificações de distância, tecnologia, etc.

        // Simule a mineração - você pode personalizar esta parte
        const minedResources = simulateMining(planetId);

        // Atualize o inventário do jogador com os minérios minerados
        await updateInventory(userId, minedResources);

        res.json({ success: true, minedResources });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao minerar minérios.' });
    }
});

// Função de simulação de mineração
function simulateMining(planetId: string) {
    // Aqui você pode implementar a lógica real de mineração, que pode depender do planeta e da tecnologia do jogador.
    // Por enquanto, vou simular uma mineração simples com valores aleatórios.
    const minedResources = [
        { itemId: 'item1', quantity: getRandomQuantity() },
        { itemId: 'item2', quantity: getRandomQuantity() },
        // Adicione mais minérios, se necessário
    ];
    return minedResources;
}

// Função para obter uma quantidade aleatória de minérios (para simulação)
function getRandomQuantity() {
    return Math.floor(Math.random() * 10) + 1; // Gera um número entre 1 e 10
}

// Função para atualizar o inventário do jogador com os minérios minerados
async function updateInventory(userId: string, minedResources: { itemId: string; quantity: number }[]) {
    const userInventory = await UserInventoryModel.findOne({ userId });

    if (!userInventory) {
        throw new Error('Inventário do jogador não encontrado.');
    }

    for (const { itemId, quantity } of minedResources) {
        const existingItem = userInventory.items.find((item) => item.itemId === itemId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            userInventory.items.push({ itemId, quantity });
        }
    }

    await userInventory.save();
}

export default miningRouter;