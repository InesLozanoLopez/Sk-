"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const profileSchema = new db_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    race: {
        dateRace: {
            type: Date,
            required: true,
        },
        distanceRace: {
            type: Number,
            required: true,
        },
        timeObj: {
            type: String,
            required: true,
        },
        minsPerKm: {
            type: Number,
            required: true,
        },
    },
    currentValues: {
        longDistance: {
            type: Number,
            required: true,
        },
    },
    trainingAvailability: {
        daysOff: {
            type: [String],
            required: true,
        },
        holidays: {
            type: [Date],
            required: true,
        },
    },
    trainings: {
        type: [db_1.default.Schema.Types.ObjectId],
    },
});
const RunnerProfile = db_1.default.model("RunnerProfile", profileSchema);
exports.default = RunnerProfile;
