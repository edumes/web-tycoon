import mongoose, { Schema, Document } from 'mongoose';

// Defina a interface para os documentos das naves espaciais
interface ISpaceship extends Document {
    name: string;
    type: string;
    capacity: number;
}

// Defina o esquema Mongoose para as naves espaciais
const SpaceshipSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    capacity: { type: Number, required: true },
});

// Crie o modelo com o esquema
const SpaceshipModel = mongoose.model<ISpaceship>('Spaceship', SpaceshipSchema);

export default SpaceshipModel;