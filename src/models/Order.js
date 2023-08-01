import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      products: [{
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Dessert',
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        category: {
          type: String,
          required: true
        },
        image: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }],
      total: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});

export default model('Order', orderSchema);
