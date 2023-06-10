const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017';
const dbName = 'Profilesdb';
const db = `${url}/${dbName}`;


async function bootstrap() {
  try {
    await mongoose.connect(db);
    return console.log(`Mongoose connected and running`)
  } catch (e) {
    console.log('Error connecting Mongoose', e)
  }
}

bootstrap();

module.exports = mongoose;