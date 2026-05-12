const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = 'mongodb+srv://vermaom003_db_user:RRGThlwGJjXcsgcP@cluster0.hp8w2ho.mongodb.net/?appName=Cluster0';
const PUBLIC_DIR = path.join(process.cwd(), 'public', 'purplepalette.in');

async function syncCategoryBanners() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const categorySchema = new mongoose.Schema({
      name: String,
      slug: String,
      imageUrl: String
    }, { collection: 'categories' });

    const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

    const categories = await Category.find({}).lean();
    console.log(`Found ${categories.length} categories`);

    for (const cat of categories) {
      // Find matching folder name (handle potential casing or special characters)
      const folders = fs.readdirSync(PUBLIC_DIR);
      const folderName = folders.find(f => f.toLowerCase() === cat.name.toLowerCase() || f.toLowerCase() === cat.slug.toLowerCase());
      
      if (folderName) {
        const folderPath = path.join(PUBLIC_DIR, folderName);
        let bannerFile = null;

        // Prioritize banner.png then banner.jpg
        if (fs.existsSync(path.join(folderPath, 'banner.png'))) {
          bannerFile = 'banner.png';
        } else if (fs.existsSync(path.join(folderPath, 'banner.jpg'))) {
          bannerFile = 'banner.jpg';
        }

        if (bannerFile) {
          const imageUrl = `/purplepalette.in/${folderName}/${bannerFile}`.replace(/\\/g, '/');
          await Category.updateOne({ _id: cat._id }, { $set: { imageUrl } });
          console.log(`Updated banner for ${cat.name}: ${imageUrl}`);
        }
      }
    }

    console.log('Sync complete');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

syncCategoryBanners();
