import { Router, Request, Response } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import PlanetModel from '../models/PlanetModel';

const planetRouter = Router();

// listar todos os planetas
planetRouter.get('/', isAuthenticated, async (req: Request, res: Response) => {
    try {
        const planets = await PlanetModel.find();
        res.json(planets);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar planetas.' });
    }
});

// criar novo planeta
planetRouter.post('/', isAuthenticated, async (req: Request, res: Response) => {
    try {
        const { name, img_url, resources } = req.body;
        const newPlanet = new PlanetModel({ name, img_url, resources });
        await newPlanet.save();
        res.json(newPlanet);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao criar um novo planeta.' });
    }
});

// detalhes de um planeta por ID
planetRouter.get('/:planetId', isAuthenticated, async (req: Request, res: Response) => {
    try {
        const planet = await PlanetModel.findById(req.params.planetId);
        if (!planet) {
            res.status(404).json({ error: 'Planeta não encontrado.' });
        } else {
            res.json(planet);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar detalhes do planeta.' });
    }
});

export default planetRouter;