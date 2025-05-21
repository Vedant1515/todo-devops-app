import mongoose from 'mongoose';
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/todos';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
