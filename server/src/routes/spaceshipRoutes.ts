import express, { Request, Response } from 'express';
import SpaceshipModel from '../models/SpaceshipModel';

const spaceshipRouter = express.Router();

// Rota para listar todas as naves espaciais
spaceshipRouter.get('/', async (req: Request, res: Response) => {
    try {
        const spaceships = await SpaceshipModel.find();
        res.json(spaceships);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao listar as naves espaciais.' });
    }
});

// Rota para criar uma nova nave espacial
spaceshipRouter.post('/', async (req: Request, res: Response) => {
    const { name, type, capacity } = req.body;

    try {
        const newSpaceship = new SpaceshipModel({ name, type, capacity });
        await newSpaceship.save();
        res.status(201).json(newSpaceship);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao criar uma nova nave espacial.' });
    }
});

// Rota para atualizar uma nave espacial existente
spaceshipRouter.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, type, capacity } = req.body;

    try {
        const updatedSpaceship = await SpaceshipModel.findByIdAndUpdate(
            id,
            { name, type, capacity },
            { new: true }
        );

        if (!updatedSpaceship) {
            res.status(404).json({ error: 'Nave espacial não encontrada.' });
        } else {
            res.json(updatedSpaceship);
        }
    } catch (error) {
        res.status(400).json({ error: 'Falha ao atualizar a nave espacial.' });
    }
});

// Rota para excluir uma nave espacial
spaceshipRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedSpaceship = await SpaceshipModel.findByIdAndDelete(id);

        if (!deletedSpaceship) {
            res.status(404).json({ error: 'Nave espacial não encontrada.' });
        } else {
            res.json(deletedSpaceship);
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao excluir a nave espacial.' });
    }
});

export default spaceshipRouter;