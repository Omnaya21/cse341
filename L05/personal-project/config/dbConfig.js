/**
 * dbConfig.js
 * @description :: exports database connection using mongoose
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URL : process.env.DB_URL;
mongoose.set('strictQuery', true);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true  
});
let db = mongoose.connection;

db.once('open', () => {
  console.log('Connection Successful');
});

db.on('error', () => {
  console.log('Error in mongodb connection');
});

module.exports = mongoose;