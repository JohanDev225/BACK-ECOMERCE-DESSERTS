import { Schema, model } from 'mongoose';

const dessertSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      }
});

export default model('Dessert', dessertSchema);