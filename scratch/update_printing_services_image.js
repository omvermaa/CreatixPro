const mongoose = require('mongoose');

async function updatePrintingServicesImage() {
  try {
    await mongoose.connect('mongodb+srv://vermaom003_db_user:RRGThlwGJjXcsgcP@cluster0.hp8w2ho.mongodb.net/?appName=Cluster0');
    
    const categorySchema = new mongoose.Schema({
      name: String,
      slug: String,
      imageUrl: String
    }, { collection: 'categories' });
    
    const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
    
    const imageUrl = "/purplepalette.in/Printing Services/Custom_Printed_Sipper_Services_in_Delhi,_Customized_Sipper_Bottle_Printing_Services_in_India/10001.jpg";
    
    const result = await Category.updateOne(
      { slug: 'printing-services' },
      { $set: { imageUrl: imageUrl } }
    );
    
    console.log('Update result for Printing Services Category Image:', result);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updatePrintingServicesImage();
