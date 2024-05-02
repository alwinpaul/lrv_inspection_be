import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    role: string;
    password: string;
}
