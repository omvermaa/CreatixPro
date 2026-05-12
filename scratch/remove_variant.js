const mongoose = require('mongoose');

async function removeVariantImage() {
  try {
    await mongoose.connect('mongodb+srv://vermaom003_db_user:RRGThlwGJjXcsgcP@cluster0.hp8w2ho.mongodb.net/?appName=Cluster0');
    
    const productSchema = new mongoose.Schema({
      name: String,
      galleryImages: [String]
    }, { collection: 'products' });
    
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
    
    const imageToRemove = "/purplepalette.in/T-Shirts/Logo_T-Shirt_Manufacturers_Delhi,_Custom_Logo_Tshirts_Suppliers_India/10001.jpg";
    
    const result = await Product.updateOne(
      { _id: '6a00751a1b9a2dc59978d6c7' },
      { $pull: { galleryImages: imageToRemove } }
    );
    
    console.log('Update result for Logo T-Shirt:', result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

removeVariantImage();
