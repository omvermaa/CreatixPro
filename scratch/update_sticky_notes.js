const mongoose = require('mongoose');

async function updateProductVariants() {
  try {
    await mongoose.connect('mongodb+srv://vermaom003_db_user:RRGThlwGJjXcsgcP@cluster0.hp8w2ho.mongodb.net/?appName=Cluster0');
    
    const productSchema = new mongoose.Schema({
      name: String,
      imageUrl: String,
      galleryImages: [String]
    }, { collection: 'products' });
    
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
    
    const folderPath = '/purplepalette.in/Printing%20Services/Sticky_Note_Pad_Printing_in_Delhi%2C_Sticky_Note_Pad_Printing_Services_Delhi%2C_India';
    
    const newGalleryImages = [
      `${folderPath}/1001.jpg`,
      `${folderPath}/10001.jpg`,
      `${folderPath}/10002.jpg`,
      `${folderPath}/10003.jpg`,
      `${folderPath}/10004.jpg`,
      `${folderPath}/10005.jpg`
    ];
    
    const result = await Product.updateOne(
      { _id: '6a0075191b9a2dc59978d6b0' },
      { 
        $set: { 
          galleryImages: newGalleryImages,
          // If the user updated the folder, they probably want the main image to be from there too.
          // Let's set it to 10001.jpg as a starting point, or keep the Cloudinary if they didn't specify.
          // But usually, local files are preferred for consistency now.
          imageUrl: `${folderPath}/1001.jpg`
        } 
      }
    );
    
    console.log('Update result for Sticky Note Pad:', result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updateProductVariants();
