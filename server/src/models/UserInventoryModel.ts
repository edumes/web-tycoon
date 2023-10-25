import mongoose, { Schema, Document } from 'mongoose';

interface IUserInventory extends Document {
    userId: string;
    items: Array<{ itemId: string; quantity: number }>;
}

const UserInventorySchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
            quantity: { type: Number, required: true, default: 0 },
        },
    ],
});

const UserInventoryModel = mongoose.model<IUserInventory>('UserInventory', UserInventorySchema);

export default UserInventoryModel;