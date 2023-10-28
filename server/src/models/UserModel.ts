import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    // Outros campos do usuário
    inventoryId: string; // Referência ao inventário do usuário
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // Outros campos do usuário
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInventory' }, // Remova o "required" para permitir criação posterior
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;