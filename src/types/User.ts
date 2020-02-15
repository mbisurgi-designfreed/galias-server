import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    token?: string;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: [true, 'Email es requerido.'],
        unique: [true, 'Email existente.']
    },
    password: {
        type: String,
        required: [true, 'Contraseña es requerido.']
    }
});

export default mongoose.model<IUser>('User', UserSchema);
