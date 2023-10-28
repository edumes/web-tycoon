import { Router } from 'express';
import UserInventoryModel from '../models/UserInventoryModel';
import PlanetModel from '../models/PlanetModel';

const miningRouter = Router();

// Rota para a mineração em um planeta
miningRouter.post('/:planetId/:resourceId', async (req, res) => {
    try {
        const { planetId, resourceId } = req.params;
        const userId = "653d8d461e5673cdb46001ce"; // req.body.id;

        // Simule a mineração com base no planeta e no recurso
        const minedResources = simulateMining(planetId, resourceId);

        // Atualize o inventário do jogador com os minérios minerados
        await updateInventory(userId, minedResources);

        res.json({ success: true, minedResources });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao minerar minérios.' });
    }
});

// Função para obter informações sobre um planeta e seu recurso
async function getPlanetResourceInfo(planetId: string, resourceId: string) {
    const planet: any = await PlanetModel.findById(planetId);
    
    if (!planet) {
        throw new Error('Planeta não encontrado.');
    }
    
    const resource = planet.resources.find((res) => res._id.toString() === resourceId);

    if (!resource) {
        throw new Error('Recurso não encontrado no planeta.');
    }

    return {
        resourceName: resource.name,
        resourceValue: resource.value,
    };
}

function simulateMining(planetId: string, resourceId: string) {
    const planetResourceInfo = getPlanetResourceInfo(planetId, resourceId);

    // Implemente sua lógica de mineração com base nas informações do planeta e do recurso
    const minedQuantity = getRandomQuantity(); // Você pode personalizar isso

    return [
        {
            itemId: resourceId,
            quantity: minedQuantity,
        },
    ];
}

// Função para obter uma quantidade aleatória de minérios (para simulação)
function getRandomQuantity() {
    return Math.floor(Math.random() * 10) + 1; // Gera um número entre 1 e 10
}

// Função para atualizar o inventário do jogador com os minérios minerados
async function updateInventory(userId: string, minedResources: { itemId: string; quantity: number }[]) {
    const userInventory = await UserInventoryModel.findOne({ userId });
    console.log("debug", userId);

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