import mongoose from 'mongoose';

// MASTER HACK: Prevent Mongoose caching issue in Next.js
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // Asli price jo customer pay karega
    mrp: { type: Number }, // Original Price (Discount dikhane ke liye, eg. ₹10000)
    images: [{ type: String, required: true }], // Ek se zyada photos dalne ke liye
    category: { type: String, required: true, default: 'Custom Dress' },
    sizes: [{ type: String, required: true }], // ['XS', 'S', 'M', 'L', 'XL']
    inStock: { type: Boolean, default: true }, // Out of stock mark karne ke liye
    isFeatured: { type: Boolean, default: false }, // Home page par top par dikhane ke liye
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product; 