import mongoose from 'mongoose';

const dbURI: string = 'mongodb://localhost:27017/tycoonGame'; // Substitua pelo URI do seu banco de dados

const connectToMongo = async (): Promise<void> => {
    try {
        await mongoose.connect(dbURI);
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro na conexão com o MongoDB:', error);
    }
}

export { connectToMongo };