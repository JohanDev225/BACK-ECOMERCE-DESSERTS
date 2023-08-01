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
      sweet: {
        type: Number,
        required: true
      },
      tags: {
        type: Array,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      available: {
        type: Boolean,
        default: true
      }
});

export default model('Dessert', dessertSchema);