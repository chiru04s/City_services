const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const users = await mongoose.connection.db.collection('users').find({}).toArray();
  console.log('Total users:', users.length);
  users.forEach(u => console.log('→', u.email, '| role:', u.role, '| password hash:', u.password?.substring(0,20)+'...'));
  process.exit();
});