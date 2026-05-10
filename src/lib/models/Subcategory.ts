import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: true 
  }
}, { timestamps: true });

export default mongoose.models.Subcategory || mongoose.model('Subcategory', subcategorySchema);
