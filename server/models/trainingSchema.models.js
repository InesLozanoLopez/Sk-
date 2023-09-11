"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const trainingsSchema = new db_1.default.Schema({
    date: {
        type: Date,
        require: true
    },
    distance: {
        type: Number,
        require: true
    },
    kmToIncrease: {
        type: Number,
        require: true
    },
    feedback: {
        type: String,
        require: false
    }
});
const Training = db_1.default.model('Training', trainingsSchema);
exports.default = Training;
