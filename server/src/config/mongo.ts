import mongoose from 'mongoose';

const dbURI: string = 'mongodb+srv://starmine-backend:90124478@cluster0.cjgzc41.mongodb.net/tycoonGame?retryWrites=true&w=majority';

const connectToMongo = async (): Promise<void> => {
    try {
        await mongoose.connect(dbURI);
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro na conexão com o MongoDB:', error);
    }
}

export { connectToMongo };