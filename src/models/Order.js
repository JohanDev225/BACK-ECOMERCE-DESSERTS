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
        quantity: {
          type: Number,
          required: true
        }
      }],
      userCity: {
        type: String,
        required: true
      },
      userAddress: {
        type: String,
        required: true
      },
      userPhone: {
        type: String,
        required: true
      },
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
