const mongoose = require('mongoose');

async function updateCorporateGiftsImage() {
  try {
    await mongoose.connect('mongodb+srv://vermaom003_db_user:RRGThlwGJjXcsgcP@cluster0.hp8w2ho.mongodb.net/?appName=Cluster0');
    
    const categorySchema = new mongoose.Schema({
      name: String,
      slug: String,
      imageUrl: String
    }, { collection: 'categories' });
    
    const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
    
    const imageUrl = "/purplepalette.in/Corporate Gifts/main.jpeg";
    
    const result = await Category.updateOne(
      { slug: 'corporate-gifts' },
      { $set: { imageUrl: imageUrl } }
    );
    
    console.log('Update result for Corporate Gifts Category Image:', result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updateCorporateGiftsImage();
