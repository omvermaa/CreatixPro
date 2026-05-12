const mongoose = require('mongoose');

async function updateUniformsImage() {
  try {
    await mongoose.connect('mongodb+srv://vermaom003_db_user:RRGThlwGJjXcsgcP@cluster0.hp8w2ho.mongodb.net/?appName=Cluster0');
    
    const categorySchema = new mongoose.Schema({
      name: String,
      slug: String,
      imageUrl: String
    }, { collection: 'categories' });
    
    const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
    
    // Construct the path relative to the public folder
    const imageUrl = "/purplepalette.in/Uniforms/Corporate_Uniform_Manufacturers_Delhi,_Top_Corporate_Uniform_Suppliers_India/10001.jpg";
    
    const result = await Category.updateOne(
      { slug: 'uniforms' },
      { $set: { imageUrl: imageUrl } }
    );
    
    console.log('Update result for Uniforms Category Image:', result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updateUniformsImage();
