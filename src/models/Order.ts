import mongoose from 'mongoose';

// MASTER HACK: Prevent Mongoose caching issue
if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

const OrderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  image: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine: String,
      city: String,
      state: String,
      pincode: String,
    },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    status: { type: String, default: 'Processing' }, // Status update yahan se hoga
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;