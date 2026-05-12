const mongoose = require('mongoose');

async function updateRainwearImage() {
  try {
    await mongoose.connect('mongodb+srv://vermaom003_db_user:RRGThlwGJjXcsgcP@cluster0.hp8w2ho.mongodb.net/?appName=Cluster0');
    
    const categorySchema = new mongoose.Schema({
      name: String,
      slug: String,
      imageUrl: String
    }, { collection: 'categories' });
    
    const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
    
    const imageUrl = "/purplepalette.in/Rainwear/Promotional_Rain_Suits_Manufacturers_Delhi,_Rain_Suits_Suppliers_India/10001.jpg";
    
    const result = await Category.updateOne(
      { slug: 'rainwear' },
      { $set: { imageUrl: imageUrl } }
    );
    
    console.log('Update result for Rainwear Category Image:', result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updateRainwearImage();
