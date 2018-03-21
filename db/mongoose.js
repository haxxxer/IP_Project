const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dburl = process.env.MONGODB_URI || 'mongodb://localhost:27017/IP_Project'
mongoose.connect(dburl);

mongoose.connection.on('connected', (err) => {
  if (err) return console.log(err);
  console.log('Mongoose connected to ' + dburl);
}) 

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
}) 

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected...');
}) 


module.exports = mongoose;