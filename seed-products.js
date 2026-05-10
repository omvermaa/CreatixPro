const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// --- MongoDB Connection ---
const MONGODB_URI = 'mongodb+srv://vermaom003_db_user:RRGThlwGJjXcsgcP@cluster0.hp8w2ho.mongodb.net/?appName=Cluster0';

// --- Schemas (inline for standalone script) ---
const categorySchema = new mongoose.Schema({
  name: String, slug: String, description: String,
}, { timestamps: true });

const subcategorySchema = new mongoose.Schema({
  name: String, slug: String, description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: String, description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  imageUrl: String,
  galleryImages: [String],
  minOrderQty: { type: Number, default: 50 },
  customizationOptions: [String],
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', subcategorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// --- Category Descriptions ---
const categoryDescriptions = {
  't-shirts': 'Explore our premium range of custom T-shirts, from classic round neck and polo styles to performance dri-fit and organic cotton options. Perfect for corporate events, promotions, team building, and brand merchandise with full customization including logo printing, embroidery, and sublimation.',
  'corporate-gifts': 'Discover our curated collection of premium corporate gifts designed to leave a lasting impression. From festive hampers and tech accessories to sustainable gifting solutions and personalized keepsakes — perfect for employee recognition, client appreciation, and special occasions.',
  'printing-services': 'Professional printing and branding services for all your corporate merchandise needs. From custom mug printing and cap branding to notebook customization and sipper bottle printing — we deliver premium quality prints that elevate your brand identity.',
  'uniforms': 'High-quality custom uniforms for corporates, hotels, and schools. Our uniforms are designed for comfort, durability, and professional appearance, with full customization options including logo embroidery, color matching, and size flexibility.',
  'rainwear': 'Stay prepared for the monsoon season with our range of premium branded rainwear. From raincoats and windcheaters to promotional rain suits — all customizable with your company logo for team events, corporate giveaways, and outdoor campaigns.',
  'hoodies': 'Premium custom hoodies for corporate teams, events, and brand merchandise. Choose from a variety of styles, fabrics, and customization options including embroidery, screen printing, and sublimation for a truly unique branded experience.',
  'sweatshirt': 'Comfortable and stylish custom sweatshirts perfect for corporate teams, college events, and winter merchandise. Available in a range of colors and sizes with premium branding options including logo embroidery and custom prints.',
};

// --- Subcategory-to-Folder mapping + Descriptions ---
// We match by extracting keywords from folder names and comparing to subcategory names/slugs
function extractProductName(folderName) {
  // Take the first part before the comma (which is the main product name)
  let name = folderName.split(',')[0];
  // Remove _Manufacturers_in_Delhi, _Manufacturers_Delhi, _Services_in_Delhi, _Printing_in_Delhi etc.
  name = name
    .replace(/_Manufacturers_in_Delhi/gi, '')
    .replace(/_Manufacturers_Delhi/gi, '')
    .replace(/_Services_in_Delhi/gi, '')
    .replace(/_Printing_in_Delhi/gi, '')
    .replace(/_Suppliers_in_India/gi, '')
    .replace(/_Suppliers_India/gi, '')
    .replace(/_in_Delhi/gi, '')
    .replace(/_Delhi/gi, '')
    .replace(/_India/gi, '')
    .replace(/_/g, ' ')
    .trim();
  return name;
}

function generateProductDescription(productName, categoryName) {
  const descriptions = {
    // Corporate Gifts
    'Christmas Gifts': 'Celebrate the festive season with our premium Christmas gift collection. From elegant gift hampers to personalized keepsakes, spread joy and strengthen business relationships with thoughtfully curated corporate Christmas gifts.',
    'Client Gifts': 'Impress your valued clients with our exclusive range of premium client gifts. Carefully curated to convey appreciation and build lasting business relationships.',
    'Birthday Gifts': 'Make birthdays memorable with our range of premium birthday gifts. From personalized items to curated hampers, perfect for employee celebrations and client milestones.',
    'Branded Gift Items': 'Elevate your brand with premium branded gift items featuring your company logo. High-quality corporate merchandise that makes a lasting impression on clients and employees.',
    'Business Gifts': 'Professional business gifts that strengthen corporate relationships. Our curated selection includes executive accessories, premium stationery, and luxury gift sets.',
    'CEO Gifts': 'Premium luxury gifts crafted for C-suite executives. Our exclusive CEO gift collection features sophisticated items that reflect prestige and appreciation.',
    'Client Onboarding Swag Kits': 'Welcome new clients with professionally curated onboarding swag kits. Create memorable first impressions with branded merchandise and premium welcome packages.',
    'Corporate Food Hamper': 'Gourmet corporate food hampers featuring premium snacks, artisanal treats, and fine beverages. Perfect for festive occasions, client appreciation, and team celebrations.',
    'Corporate Gift Boxes': 'Elegantly packaged corporate gift boxes designed to impress. Our curated gift boxes combine premium products with sophisticated presentation for maximum impact.',
    'Corporate Gift Sets': 'Comprehensive corporate gift sets that combine multiple premium items into one impressive package. Perfect for executive gifts, employee rewards, and client appreciation.',
    'Corporate Gifts': 'Premium corporate gifting solutions for all occasions. From T-shirts to executive accessories, explore our comprehensive range of customizable corporate merchandise.',
    'Corporate Wellness Kits': 'Promote employee well-being with our thoughtfully curated corporate wellness kits. Includes health accessories, self-care items, and wellness products for a healthier workplace.',
    'Custom Promotional Gifts': 'Stand out with custom promotional gifts tailored to your brand. High-quality customizable products that effectively promote your business and leave a lasting impression.',
    'Diwali Gifts Hampers': 'Celebrate Diwali with our premium festive gift hampers. Beautifully packaged with traditional sweets, dry fruits, and luxury items — perfect for corporate Diwali gifting.',
    'Diwali Gifts': 'Light up the festive season with our exclusive Diwali gift collection. From traditional hampers to modern gifting solutions, celebrate the festival of lights with premium corporate gifts.',
    'Eco-Friendly Office Gifts': 'Sustainable and eco-friendly office gifts that align with your green values. From recycled materials to plantable products — gift responsibly while making an impression.',
    'Employee Gifts': 'Recognize and reward your team with thoughtful employee gifts. From milestone celebrations to appreciation gestures, our range helps build a motivated and loyal workforce.',
    'Event Gifts': 'Make your events unforgettable with our premium event gift collection. From conference giveaways to award ceremony gifts — customizable options for every occasion.',
    'Event Giveaways': 'High-impact event giveaway solutions that maximize brand visibility. Cost-effective promotional items that attendees love and remember long after the event.',
    "Father's Day Gifts": "Show appreciation this Father's Day with our specially curated gift collection. Premium items that convey gratitude and make dads feel truly special.",
    "Mother's Day Gifts": "Celebrate mothers with our elegant Mother's Day gift collection. Thoughtfully curated gifts that express love and appreciation for the special women in our lives.",
    'Promotional Gifts': 'Boost your brand with our extensive range of promotional gifts. High-quality customizable products designed to increase brand awareness and customer engagement.',
    'Sustainable Gifting': 'Embrace sustainable gifting with our eco-conscious collection. From biodegradable products to ethically sourced items — make a positive impact with every gift.',
    'Tech Gifts': 'Impress tech enthusiasts with our premium tech gift collection. From smart gadgets and power banks to wireless accessories — cutting-edge technology meets corporate gifting.',
    'Gifts for Men': 'Premium gift collection curated for men. From executive accessories and leather goods to tech gadgets — sophisticated options for every taste and occasion.',
    'Trendy Gifts': 'Stay ahead with our trendy gift collection featuring the latest in corporate gifting. Modern designs and contemporary products that resonate with today\'s professionals.',
    "Women's Day Gifts": "Celebrate Women's Day with our empowering gift collection. Thoughtful and elegant gifts designed to honor and appreciate the remarkable women in your organization.",
    'Work From Home Gifts': 'Enhance the remote work experience with our WFH gift collection. From ergonomic accessories to productivity tools — help your team work comfortably from anywhere.',
    
    // Hoodies
    'Corporate Hoodies': 'Premium corporate hoodies with custom branding. Perfect for team uniforms, corporate events, and brand merchandise. Available in multiple colors with embroidery and print options.',
    'Customised Hoodies': 'Fully customizable hoodies tailored to your specifications. Choose from a range of fabrics, colors, and styles with premium branding options for a unique team look.',
    'Promotional Hoodies': 'High-quality promotional hoodies that combine comfort with brand visibility. Ideal for marketing campaigns, events, and corporate giveaways.',
    
    // Sweatshirts
    'Corporate Sweatshirts': 'Professional corporate sweatshirts with premium branding. Comfortable fleece-lined options perfect for team wear, corporate events, and winter merchandise.',
    'Logo Sweatshirt': 'Custom logo sweatshirts featuring your brand identity. High-quality prints and embroidery on premium fabrics for a polished corporate look.',
    'Personalized Sweatshirt': 'Individually personalized sweatshirts for team members. Add names, designations, or custom designs for a truly unique corporate merchandise experience.',
    'Promotional Sweatshirts': 'Branded promotional sweatshirts for marketing campaigns and events. Comfortable, stylish, and fully customizable for maximum brand impact.',
    
    // Rainwear
    'Promotional Rain Suits': 'Branded rain suits for outdoor events and monsoon promotions. Full-body rain protection with custom logo printing for maximum brand visibility in wet weather.',
    'Raincoat': 'Premium branded raincoats for corporate teams and promotional campaigns. Durable, waterproof, and fully customizable with your company logo and colors.',
    'Windcheaters': 'Stylish branded windcheaters perfect for outdoor corporate events. Lightweight, wind-resistant, and customizable with embroidery and screen printing options.',
    
    // Uniforms
    'Corporate Uniform': 'Professional corporate uniforms that reflect your brand identity. Custom-designed with premium fabrics, perfect stitching, and comprehensive branding options.',
    'Hotel Uniform': 'Premium hotel uniforms designed for the hospitality industry. Elegant styles for front desk, housekeeping, and kitchen staff with custom branding options.',
    'School Uniform': 'High-quality school uniforms manufactured to the highest standards. Durable fabrics, comfortable fit, and available in all sizes with school logo customization.',
  };

  // Try to find a matching description
  for (const [key, desc] of Object.entries(descriptions)) {
    if (productName.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(productName.toLowerCase().replace(/s$/, ''))) {
      return desc;
    }
  }

  // Fallback - generate a generic description based on category
  return `Premium ${productName.toLowerCase()} from our ${categoryName} collection. Custom branding and bulk ordering available with high-quality materials and professional finishing. Perfect for corporate events, promotions, and brand merchandise.`;
}

// Generate subcategory descriptions
function generateSubcategoryDescription(subcatName, categoryName) {
  const name = subcatName.replace(/\s+/g, ' ').trim();
  return `Explore our premium range of ${name.toLowerCase()}. High-quality ${categoryName.toLowerCase()} with custom branding options, available for bulk orders with competitive pricing and fast delivery across India.`;
}

// --- Mapping logic ---
function normalizeForMatch(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function findBestSubcategoryMatch(folderName, subcategories, categoryId) {
  const productName = extractProductName(folderName);
  const normalizedProduct = normalizeForMatch(productName);
  
  // Filter subcategories to only this category
  const catSubcats = subcategories.filter(s => s.category.toString() === categoryId.toString());
  
  // Try exact-ish matching first
  for (const sub of catSubcats) {
    const normalizedSub = normalizeForMatch(sub.name);
    
    // Direct match
    if (normalizedProduct.includes(normalizedSub) || normalizedSub.includes(normalizedProduct)) {
      return sub;
    }
    
    // Match slug parts
    const slugParts = sub.slug.split('-');
    const productParts = normalizedProduct.split(' ');
    const overlap = slugParts.filter(p => p.length > 2 && productParts.some(pp => pp.includes(p) || p.includes(pp)));
    if (overlap.length >= 2) {
      return sub;
    }
  }
  
  // Fuzzy matching - score each subcategory
  let bestMatch = null;
  let bestScore = 0;
  
  for (const sub of catSubcats) {
    const normalizedSub = normalizeForMatch(sub.name);
    const subWords = normalizedSub.split(' ').filter(w => w.length > 2);
    const prodWords = normalizedProduct.split(' ').filter(w => w.length > 2);
    
    let score = 0;
    for (const sw of subWords) {
      for (const pw of prodWords) {
        if (sw === pw) score += 3;
        else if (sw.includes(pw) || pw.includes(sw)) score += 2;
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = sub;
    }
  }
  
  return bestScore >= 2 ? bestMatch : null;
}

// --- Category folder name to slug mapping ---
const categoryFolderToSlug = {
  'Corporate Gifts': 'corporate-gifts',
  'Hoodies': 'hoodies',
  'Printing Services': 'printing-services',
  'Rainwear': 'rainwear',
  'Sweatshirts': 'sweatshirt',
  'T-Shirts': 't-shirts',
  'Uniforms': 'uniforms',
};

// --- Main seed function ---
async function seed() {
  console.log('🔗 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected!\n');

  // Fetch existing data
  const categories = await Category.find({});
  const subcategories = await Subcategory.find({});
  
  console.log(`Found ${categories.length} categories, ${subcategories.length} subcategories\n`);

  // Clear existing products
  const deletedCount = await Product.deleteMany({});
  console.log(`🗑️ Cleared ${deletedCount.deletedCount} existing products\n`);

  // Update category descriptions
  for (const cat of categories) {
    const desc = categoryDescriptions[cat.slug];
    if (desc) {
      await Category.findByIdAndUpdate(cat._id, { description: desc });
      console.log(`📝 Updated description for category: ${cat.name}`);
    }
  }
  console.log('');

  // Update subcategory descriptions
  for (const sub of subcategories) {
    const cat = categories.find(c => c._id.toString() === sub.category.toString());
    if (cat) {
      const desc = generateSubcategoryDescription(sub.name, cat.name);
      await Subcategory.findByIdAndUpdate(sub._id, { description: desc });
    }
  }
  console.log(`📝 Updated descriptions for ${subcategories.length} subcategories\n`);

  const BASE_DIR = path.join(__dirname, 'public', 'purplepalette.in');
  const catFolders = fs.readdirSync(BASE_DIR);
  
  let totalProducts = 0;
  let unmatchedFolders = [];

  for (const catFolder of catFolders) {
    const catPath = path.join(BASE_DIR, catFolder);
    if (!fs.statSync(catPath).isDirectory()) continue;
    
    const catSlug = categoryFolderToSlug[catFolder];
    if (!catSlug) {
      console.log(`⚠️ No slug mapping for category folder: ${catFolder}`);
      continue;
    }
    
    const category = categories.find(c => c.slug === catSlug);
    if (!category) {
      console.log(`⚠️ Category not found in DB: ${catSlug}`);
      continue;
    }
    
    console.log(`\n📁 Processing category: ${catFolder} (${category.name})`);
    
    const subFolders = fs.readdirSync(catPath).filter(f => fs.statSync(path.join(catPath, f)).isDirectory());
    
    for (const subFolder of subFolders) {
      const subPath = path.join(catPath, subFolder);
      const images = fs.readdirSync(subPath)
        .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
        .sort();
      
      if (images.length === 0) continue;
      
      // Find matching subcategory
      const subcategory = findBestSubcategoryMatch(subFolder, subcategories, category._id);
      
      if (!subcategory) {
        unmatchedFolders.push({ folder: subFolder, category: catFolder });
        console.log(`  ❌ No subcategory match for: ${subFolder}`);
        continue;
      }
      
      // Build image paths (URL paths relative to public/)
      const imageBasePath = `/purplepalette.in/${encodeURIComponent(catFolder)}/${encodeURIComponent(subFolder)}`;
      const mainImage = `${imageBasePath}/${images[0]}`;
      const galleryImages = images.slice(1).map(img => `${imageBasePath}/${img}`);
      
      // Extract clean product name
      const productName = extractProductName(subFolder);
      const description = generateProductDescription(productName, category.name);
      
      // Determine customization options based on category
      let customizationOptions = ['Logo Printing', 'Custom Colors'];
      if (catSlug === 't-shirts' || catSlug === 'hoodies' || catSlug === 'sweatshirt') {
        customizationOptions = ['Logo Printing', 'Custom Colors', 'Embroidery', 'Screen Printing', 'Size Customization'];
      } else if (catSlug === 'corporate-gifts') {
        customizationOptions = ['Logo Engraving', 'Custom Packaging', 'Personalized Message', 'Brand Colors'];
      } else if (catSlug === 'printing-services') {
        customizationOptions = ['Full Color Printing', 'Logo Placement', 'Custom Design', 'Bulk Pricing'];
      } else if (catSlug === 'uniforms') {
        customizationOptions = ['Logo Embroidery', 'Custom Sizing', 'Color Matching', 'Fabric Selection'];
      } else if (catSlug === 'rainwear') {
        customizationOptions = ['Logo Printing', 'Custom Colors', 'Reflective Strips', 'Size Customization'];
      }
      
      const product = await Product.create({
        name: productName,
        description,
        category: category._id,
        subcategory: subcategory._id,
        imageUrl: mainImage,
        galleryImages,
        minOrderQty: 50,
        customizationOptions,
      });
      
      totalProducts++;
      console.log(`  ✅ Created: ${productName} (${images.length} images, matched to "${subcategory.name}")`);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎉 Seeding complete! Created ${totalProducts} products.`);
  
  if (unmatchedFolders.length > 0) {
    console.log(`\n⚠️ ${unmatchedFolders.length} unmatched folders:`);
    unmatchedFolders.forEach(f => console.log(`  - ${f.category}/${f.folder}`));
  }

  await mongoose.disconnect();
  console.log('\n🔌 Disconnected from MongoDB.');
}

seed().catch(err => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
