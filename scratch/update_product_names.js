const mongoose = require('mongoose');

async function updateProductNames() {
  try {
    await mongoose.connect('mongodb+srv://vermaom003_db_user:RRGThlwGJjXcsgcP@cluster0.hp8w2ho.mongodb.net/?appName=Cluster0');
    console.log('Connected to MongoDB');

    const subcategorySchema = new mongoose.Schema({
      name: String,
      slug: String,
    }, { collection: 'subcategories' });

    const productSchema = new mongoose.Schema({
      name: String,
      subcategory: mongoose.Schema.Types.ObjectId,
    }, { collection: 'products' });

    const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', subcategorySchema);
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

    const products = await Product.find({});
    console.log(`Found ${products.length} products`);

    let updatedCount = 0;

    for (const product of products) {
      if (product.subcategory) {
        const subcategory = await Subcategory.findById(product.subcategory);
        if (subcategory && subcategory.name) {
          const oldName = product.name;
          product.name = subcategory.name;
          await product.save();
          console.log(`Updated product ${product._id}: "${oldName}" -> "${subcategory.name}"`);
          updatedCount++;
        } else {
          console.log(`Subcategory not found for product ${product._id} or has no name`);
        }
      } else {
        console.log(`Product ${product._id} has no subcategory`);
      }
    }

    console.log(`Successfully updated ${updatedCount} products`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updateProductNames();
