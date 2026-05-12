const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = 'mongodb+srv://vermaom003_db_user:RRGThlwGJjXcsgcP@cluster0.hp8w2ho.mongodb.net/?appName=Cluster0';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function syncGalleries() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const productSchema = new mongoose.Schema({
      name: String,
      imageUrl: String,
      galleryImages: [String]
    }, { collection: 'products' });

    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

    const products = await Product.find({}).lean();
    console.log(`Found ${products.length} products`);

    let updatedCount = 0;

    for (const product of products) {
      let imagePath = product.imageUrl;
      
      // Handle potential URL encoding in the database
      if (imagePath && imagePath.startsWith('/')) {
        const decodedPath = decodeURIComponent(imagePath);
        const fullPath = path.join(PUBLIC_DIR, decodedPath);
        const dirPath = path.dirname(fullPath);

        if (fs.existsSync(dirPath)) {
          const files = fs.readdirSync(dirPath);
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
          
          const galleryFiles = files
            .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
            .map(file => {
              // Construct the relative path used by the site
              const relativeDir = path.dirname(decodedPath);
              return path.join(relativeDir, file).replace(/\\/g, '/');
            })
            .filter(file => file !== decodedPath); // Don't include the main image in gallery if you want, or include all.
            // Actually, let's include all images in the gallery as variants.
            
          const allImagesInDir = files
            .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
            .map(file => {
              const relativeDir = path.dirname(decodedPath);
              return path.join(relativeDir, file).replace(/\\/g, '/');
            })
            .sort();

          // Update if the gallery has changed
          if (JSON.stringify(product.galleryImages) !== JSON.stringify(allImagesInDir)) {
            await Product.updateOne(
              { _id: product._id },
              { $set: { galleryImages: allImagesInDir } }
            );
            console.log(`Updated gallery for: ${product.name} (${allImagesInDir.length} images)`);
            updatedCount++;
          }
        }
      }
    }

    console.log(`Total products updated: ${updatedCount}`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

syncGalleries();
