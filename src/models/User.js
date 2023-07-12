//Schema de users
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: {type : String, required: true, unique: true},
    password: {type : String, required: true},
    role: String
});

export default model('User', userSchema);
