const db = require('./db');
const Training = require('./trainingSchema.models')


const profileSchema = new db.Schema({
    name:{
        type: String,
        require: true
    },
    race:{
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
        elevation: {
            type: Number,
            require: true
        }
    },
    currentValues:{
        longDistance: {
            type: Number,
            require: true
        },
        sprintTime: {
            type: String,
            require: true
        },
        sprintDistance: {
            type: Number,
            require: true
        }
    },
    trainingAvailability:{
        daysPerWeek: {
            type: Number,
            require: true
        },
        daysOff: {
            type : [String],
            require: true
        },
        holidays: {
            type: [Date],
            require: true
        },
    },
    trainings:{
        type: [Training.Types.ObjectId],
        require: false
    }
})

const RunnerProfile = db.model('RunnerProfile', profileSchema)

module.exports = RunnerProfile;