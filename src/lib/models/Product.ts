import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: true
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  },
  imageUrl: { type: String, required: true },
  galleryImages: [{ type: String }],
  minOrderQty: { type: Number, default: 50 },
  customizationOptions: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
