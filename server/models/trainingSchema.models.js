const db = require('./db');

const trainingsSchema = new db.Schema({
  date: {
    type: Date,
    require: true
  },
  distance: {
    type: Number,
    require: true
  },
  feedback: {
    type: String,
    require: false
  }
})

const Training = db.model('Training', trainingsSchema)

module.exports = Training;