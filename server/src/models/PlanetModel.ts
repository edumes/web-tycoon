import mongoose, { Schema, Document } from 'mongoose';

interface Resource {
    name: string;
    value: number;
}

interface Planet extends Document {
    name: string;
    resources: Resource[];
}

const planetSchema = new Schema<Planet>({
    name: String,
    resources: [{ name: String, value: Number }],
});

const PlanetModel = mongoose.model<Planet>('Planet', planetSchema);

export default PlanetModel;