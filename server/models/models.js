const { trusted } = require('mongoose');
const db = require('./db');

const profileSchema = new db.Schema({
    name:{
        type: String,
        require: true
    },
    race:{
        dateRace: Date,
        distanceRace: Number,
        timeObj: Number,
        timeObjPerKm: Number,
        elevation: Number
    },
    currentCondition:{
        longDistance: Number,
        sprintTime: Number,
        sprintDistance: Number,
    },
    trainingAvailability:{
        daysPerWeek: Number,
        daysOff: [Date],
        holidays: [Date]
    }
})

const RunnerProfile = db.model('RunnerProfile', profileSchema)

module.exports = RunnerProfile;