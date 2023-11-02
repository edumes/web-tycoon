import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    inventoryId: string;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInventory' }
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;