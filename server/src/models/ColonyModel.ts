import mongoose, { Schema, Document } from 'mongoose';

// Defina a interface para os documentos das colônias
interface IColony extends Document {
    name: string;
    planet: string;
    population: number;
}

// Defina o esquema Mongoose para as colônias
const ColonySchema: Schema = new Schema({
    name: { type: String, required: true },
    planet: { type: String, required: true },
    population: { type: Number, required: true },
});

// Crie o modelo com o esquema
const ColonyModel = mongoose.model<IColony>('Colony', ColonySchema);

export default ColonyModel;