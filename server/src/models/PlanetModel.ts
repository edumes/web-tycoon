import mongoose, { Schema, Document } from 'mongoose';

interface Resource {
    _id: any;
    name: string;
    value: number;
    img_url: string;
    quantity: number;
}

interface Planet extends Document {
    name: string;
    resources: Resource[];
    img_url: string;
}

const planetSchema = new Schema<Planet>({
    name: String,
    resources: [{ name: String, value: Number, img_url: String, quantity: Number }],
    img_url: String
});

const PlanetModel = mongoose.model<Planet>('Planet', planetSchema);

export default PlanetModel;