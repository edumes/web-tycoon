import { Router } from 'express';
import authenticateUser from '../middleware/authenticationMiddleware';
import UserInventoryModel from '../models/UserInventoryModel';
import PlanetModel from '../models/PlanetModel';

const miningRouter = Router();

miningRouter.post('/:planetId/:resourceId', authenticateUser, async (req, res) => { // minerar
    try {
        const { planetId, resourceId } = req.params;
        const userId = req.body.id; // req.body.id;

        // informações sobre o planeta e o recurso a ser minerado
        const { resourceName, img_url } = await getPlanetResourceInfo(planetId, resourceId);
        const randomQuantity = Math.floor(Math.random() * 3) + 1 // entre 1 a 3
        // mineração com base no planeta e no minerio
        const minedResources = [
            { itemId: resourceId, resourceName: resourceName, quantity: randomQuantity, img_url: img_url }
        ];

        await updateInventory(userId, minedResources);

        res.json({ success: true, minedResources });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao minerar minérios.' });
    }
});

// obter informações sobre um planeta e seu recurso
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
        img_url: resource.img_url
    };
}

// atualizar o inventário do jogador com os minérios minerados
async function updateInventory(userId: string, minedResources: { itemId: string; resourceName: string; quantity: number; img_url: string }[]) {
    const userInventory = await UserInventoryModel.findOne({ userId });

    if (!userInventory) {
        throw new Error('Inventário do jogador não encontrado.');
    }

    for (const { itemId, resourceName, quantity, img_url } of minedResources) {
        const existingItem = userInventory.items.find((item) => item.itemId.toString() === itemId);
        // console.log("existingItem", existingItem)
        if (existingItem) {
            // console.log("1", itemId, quantity)
            existingItem.quantity += quantity;
        } else {
            // console.log("2", userInventory.items)
            userInventory.items.push({ itemId, resourceName, quantity, img_url });
        }
    }

    await userInventory.save();
}

export default miningRouter;