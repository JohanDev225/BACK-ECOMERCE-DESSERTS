//Schema de users
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: {type : String, required: true, unique: true},
    password: {type : String, required: true},
    role: String,
    wishlist: [{
        product: { type: Schema.Types.ObjectId, ref: 'Dessert' },
        quantity: Number
      }],
});

export default model('User', userSchema);
