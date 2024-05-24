const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://akshayabalki03:Akshaya%402003@ac-wzahwit-shard-00-00.vyeyou3.mongodb.net:27017,ac-wzahwit-shard-00-01.vyeyou3.mongodb.net:27017,ac-wzahwit-shard-00-02.vyeyou3.mongodb.net:27017/?ssl=true&replicaSet=atlas-8dmdzl-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
