import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    // Outros campos do usuário
    inventoryId: string; // Referência ao inventário do usuário
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    // Outros campos do usuário
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInventory', required: true },
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;