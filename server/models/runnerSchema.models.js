const db = require('./db');

const profileSchema = new db.Schema({
  name: {
    type: String,
    require: true
  },
  race: {
    dateRace: {
      type: Date,
      require: true
    },
    distanceRace: {
      type: Number,
      require: true
    },
    timeObj: {
      type: String,
      require: true
    },
    minsPerKm: {
      type: Number,
      require: true
    },
  },
  currentValues: {
    longDistance: {
      type: Number,
      require: true
    },
  },
  trainingAvailability: {
    daysOff: {
      type: [String],
      require: true
    },
    holidays: {
      type: [Date],
      require: true
    },
  },
  trainings: {
    type: [db.Schema.Types.ObjectId],
    require: false
  }
})

const RunnerProfile = db.model('RunnerProfile', profileSchema)

module.exports = RunnerProfile;