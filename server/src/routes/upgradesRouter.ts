import { Router } from 'express';
import authenticateUser from '../middleware/authenticationMiddleware';
import UserInventoryModel from '../models/UserInventoryModel';

const upgradesRouter = Router();

const upgrades = [
    {
        "upgrades": [
            {
                "name": "Brocas de Diamante",
                "description": "Melhore a eficiência da mineração com brocas de diamante.",
                "price": 500,
                "effect": {
                    "miningSpeed": 2
                }
            },
            {
                "name": "Transportador de Minérios",
                "description": "Transportadores de alta tecnologia para receber minérios mais rapidamente.",
                "price": 1000,
                "effect": {
                    "miningRate": 1.5
                }
            }
        ]
    }
];

// Rota para comprar melhorias
upgradesRouter.post('/buy/:upgradeId', authenticateUser, async (req, res) => {
    try {
        const userId = req.body.id; // Você deve ter um sistema de autenticação para obter o ID do jogador
        const { upgradeId } = req.params;

        const selectedUpgrade = upgrades.find((upgrade: any) => upgradeId === upgrade.name);

        if (!selectedUpgrade) {
            return res.status(400).json({ error: 'Melhoria não encontrada.' });
        }

        // Verifique se o jogador tem dinheiro suficiente para comprar a melhoria
        // Atualize o inventário do jogador com a melhoria adquirida
        // Atualize o saldo do jogador no banco de dados

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao comprar a melhoria.' });
    }
});

export default upgradesRouter;
