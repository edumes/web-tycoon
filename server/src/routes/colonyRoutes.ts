import express, { Request, Response } from 'express';
import ColonyModel from '../models/ColonyModel';

const colonyRouter = express.Router();

// Rota para listar todas as colônias
colonyRouter.get('/', async (req: Request, res: Response) => {
    try {
        const colonies = await ColonyModel.find();
        res.json(colonies);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao listar as colônias.' });
    }
});

// Rota para criar uma nova colônia
colonyRouter.post('/', async (req: Request, res: Response) => {
    const { name, planet, population } = req.body;

    try {
        const newColony = new ColonyModel({ name, planet, population });
        await newColony.save();
        res.status(201).json(newColony);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao criar uma nova colônia.' });
    }
});

// Rota para atualizar uma colônia existente
colonyRouter.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, planet, population } = req.body;

    try {
        const updatedColony = await ColonyModel.findByIdAndUpdate(
            id,
            { name, planet, population },
            { new: true }
        );

        if (!updatedColony) {
            res.status(404).json({ error: 'Colônia não encontrada.' });
        } else {
            res.json(updatedColony);
        }
    } catch (error) {
        res.status(400).json({ error: 'Falha ao atualizar a colônia.' });
    }
});

// Rota para excluir uma colônia
colonyRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedColony = await ColonyModel.findByIdAndDelete(id);

        if (!deletedColony) {
            res.status(404).json({ error: 'Colônia não encontrada.' });
        } else {
            res.json(deletedColony);
        }
    } catch (error) {
        res.status(500).json({ error: 'Falha ao excluir a colônia.' });
    }
});

export default colonyRouter;