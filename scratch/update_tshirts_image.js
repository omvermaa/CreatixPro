const mongoose = require('mongoose');

async function updateTShirtsImage() {
  try {
    await mongoose.connect('mongodb+srv://vermaom003_db_user:RRGThlwGJjXcsgcP@cluster0.hp8w2ho.mongodb.net/?appName=Cluster0');
    
    const categorySchema = new mongoose.Schema({
      name: String,
      slug: String,
      imageUrl: String
    }, { collection: 'categories' });
    
    const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
    
    const imageUrl = "/purplepalette.in/T-Shirts/Dri_Fit_T_Shirts_Manufacturers_Delhi,_Custom_Dri_fit_Shirts_Suppliers_India/10001.jpg";
    
    const result = await Category.updateOne(
      { slug: 't-shirts' },
      { $set: { imageUrl: imageUrl } }
    );
    
    console.log('Update result for T-shirts Category Image:', result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updateTShirtsImage();
