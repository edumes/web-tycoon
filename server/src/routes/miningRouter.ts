import { Router, Request, Response } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import UserInventoryModel from '../models/UserInventoryModel';
import PlanetModel from '../models/PlanetModel';

const miningRouter = Router();

miningRouter.post('/:planetId/:resourceId', isAuthenticated, async (req: Request, res: Response) => {
    try {
        const { planetId, resourceId } = req.params;
        const userId = req.user_id;

        // Obter informações sobre o planeta e o recurso a ser minerado
        const { resourceName, img_url, resourceValue } = await getPlanetResourceInfo(planetId, resourceId);
        const randomQuantity = Math.floor(Math.random() * 3) + 1; // Entre 1 e 3

        // Calcular a quantidade minerada e o valor total
        const minedQuantity = Math.min(randomQuantity, resourceValue);

        // Mineração com base no planeta e no minério
        const minedResources = [
            { itemId: resourceId, resourceName, quantity: minedQuantity, img_url, value: minedQuantity * resourceValue }
        ];

        // Atualizar o inventário do usuário
        const userInventory = await getUserInventory(userId);
        await updateInventory(userInventory.userId, minedResources);

        // Atualizar a quantidade total de minério no planeta após a mineração
        await updatePlanetResource(planetId, resourceId, minedQuantity);

        res.json({ success: true, minedResources });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao minerar minérios.' });
    }
});

// Obter informações sobre um planeta e seu recurso
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
        img_url: resource.img_url,
        resourceValue: resource.value,
    };
}

// Atualizar o inventário do jogador com os minérios minerados
async function updateInventory(userId: string, minedResources: { itemId: string; resourceName: string; quantity: number; img_url: string; value: number }[]) {
    const userInventory = await UserInventoryModel.findOne({ userId });

    if (!userInventory) {
        throw new Error('Inventário do jogador não encontrado.');
    }

    for (const { itemId, resourceName, quantity, img_url, value } of minedResources) {
        const existingItem = userInventory.items.find((item) => item.itemId.toString() === itemId);

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.value += value;
        } else {
            userInventory.items.push({ itemId, resourceName, quantity, img_url, value });
        }
    }

    await userInventory.save();
}

// Atualizar a quantidade total de minério no planeta após a mineração
async function updatePlanetResource(planetId: string, resourceId: string, minedQuantity: number) {
    const planet = await PlanetModel.findById(planetId);

    if (!planet) {
        throw new Error('Planeta não encontrado.');
    }

    const resourceIndex = planet.resources.findIndex((res) => res._id.toString() === resourceId);

    if (resourceIndex === -1) {
        throw new Error('Recurso não encontrado no planeta.');
    }

    // Diminuir a quantidade do recurso no planeta
    planet.resources[resourceIndex].quantity -= minedQuantity;

    await planet.save();
}

// Obter/atualizar o inventário do jogador
async function getUserInventory(userId: string) {
    try {
        const userInventory = await UserInventoryModel.findOneAndUpdate(
            { userId },
            {},
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        if (!userInventory) {
            throw new Error('Inventário do jogador não encontrado.');
        }

        return userInventory;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao obter/atualizar o inventário do jogador.');
    }
}

export default miningRouter;