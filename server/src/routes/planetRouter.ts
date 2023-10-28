import { Router } from 'express';
import PlanetModel from '../models/PlanetModel';

const planetRouter = Router();

// Rota para listar todos os planetas
planetRouter.get('/', async (req, res) => {
    try {
        const planets = await PlanetModel.find();
        res.json(planets);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar planetas.' });
    }
});

// Rota para criar um novo planeta
planetRouter.post('/', async (req, res) => {
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

// Rota para buscar detalhes de um planeta por ID
planetRouter.get('/:planetId', async (req, res) => {
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