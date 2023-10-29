import mongoose, { Schema, Document } from 'mongoose';

interface IResource extends Document {
    name: string;
    value: number;
    img_url: string;
    planetId: string;
}

const ResourceSchema: Schema = new Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true },
    img_url: String,
    planetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Planet', required: true },
});

const ResourceModel = mongoose.model<IResource>('Resource', ResourceSchema);

export default ResourceModel;