import mongoose, { Schema, Document } from 'mongoose';

interface IUserInventory extends Document {
    userId: string;
    items: Array<{
        value: number; itemId: string; resourceName: string; quantity: number, img_url: string 
}>;
}

const UserInventorySchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
            resourceName: String,
            quantity: { type: Number, required: true, default: 0 },
            img_url: String
        },
    ],
});

const UserInventoryModel = mongoose.model<IUserInventory>('UserInventory', UserInventorySchema);

export default UserInventoryModel;