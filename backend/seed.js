const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Category = require('./models/Category');
const Service = require('./models/Service');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  await User.deleteMany(); await Category.deleteMany(); await Service.deleteMany();

  const admin = await User.create({ name: 'Admin User', email: 'admin@city.com', password: 'admin123', role: 'admin' });
  
  const categories = await Category.insertMany([
    { name: 'Plumbing', icon: '🔧', description: 'All plumbing services' },
    { name: 'Electrical', icon: '⚡', description: 'Electrical repairs & installation' },
    { name: 'Cleaning', icon: '🧹', description: 'Home & office cleaning' },
    { name: 'Carpentry', icon: '🪚', description: 'Furniture & woodwork' },
    { name: 'Painting', icon: '🎨', description: 'Interior & exterior painting' },
    { name: 'AC Repair', icon: '❄️', description: 'AC service & repair' },
    { name: 'Pest Control', icon: '🦟', description: 'Pest removal services' },
    { name: 'Appliance Repair', icon: '🔌', description: 'All home appliances' },
  ]);

  await Service.insertMany([
    { name: 'Pipe Leak Repair', description: 'Fix pipe leaks and water flow issues quickly and efficiently.', category: categories[0]._id, provider: provider1._id, price: 499, priceType: 'starting', duration: '1-2 hours', rating: 4.5, numReviews: 12 },
    { name: 'Bathroom Fitting', description: 'Complete bathroom fitting and plumbing work.', category: categories[0]._id, provider: provider1._id, price: 1499, priceType: 'starting', duration: '3-4 hours', rating: 4.7, numReviews: 8 },
    { name: 'Fan & Light Installation', description: 'Safe installation of ceiling fans and light fixtures.', category: categories[1]._id, provider: provider2._id, price: 299, priceType: 'fixed', duration: '30-60 mins', rating: 4.8, numReviews: 25 },
    { name: 'Wiring & Switchboard', description: 'Complete home wiring and switchboard replacement.', category: categories[1]._id, provider: provider2._id, price: 899, priceType: 'starting', duration: '2-3 hours', rating: 4.6, numReviews: 15 },
    { name: 'Full Home Deep Clean', description: 'Professional deep cleaning of your entire home.', category: categories[2]._id, provider: provider1._id, price: 1999, priceType: 'starting', duration: '4-6 hours', rating: 4.9, numReviews: 32 },
    { name: 'Sofa & Carpet Cleaning', description: 'Expert sofa and carpet shampooing service.', category: categories[2]._id, provider: provider2._id, price: 799, priceType: 'starting', duration: '1-2 hours', rating: 4.4, numReviews: 18 },
    { name: 'AC Service & Gas Refill', description: 'Complete AC servicing, filter cleaning, and gas refill.', category: categories[5]._id, provider: provider1._id, price: 699, priceType: 'starting', duration: '1-2 hours', rating: 4.7, numReviews: 40 },
    { name: 'Wall Painting', description: 'Professional interior wall painting with premium paints.', category: categories[4]._id, provider: provider2._id, price: 3999, priceType: 'starting', duration: '1-2 days', rating: 4.5, numReviews: 20 },
  ]);

  console.log('✅ Database seeded!');
  console.log('Admin: admin@city.com / admin123');
 
  process.exit();
};

seed().catch((e) => { console.error(e); process.exit(1); });