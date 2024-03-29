"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTraining = exports.editTrainings = exports.runnerTrainings = exports.createTraining = void 0;
const runnerSchema_models_1 = __importDefault(require("../models/runnerSchema.models"));
const trainingSchema_models_1 = __importDefault(require("../models/trainingSchema.models"));
function updateDistance(distance, string) {
    if (string.feedback === "light") {
        return distance * 1.1;
    }
    else if (string.feedback === "hard") {
        return distance / 1.1;
    }
    else {
        return distance;
    }
}
function newDistance(distance, kmToIncrease, length) {
    const addDistance = kmToIncrease / (length - 1);
    return addDistance + distance;
}
const createTraining = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTraining = req.body;
        const trainings = yield trainingSchema_models_1.default.create({
            date: newTraining.date,
            distance: newTraining.distance,
            kmToIncrease: newTraining.kmToIncrease,
            feedback: null,
        });
        const runnerName = newTraining.runnerName;
        const runnerProfile = yield runnerSchema_models_1.default.findOne({
            name: runnerName,
        });
        if (!runnerProfile) {
            res.status(404).json({ error: "Runner profile not found" });
            return;
        }
        if (runnerProfile.trainings === undefined) {
            runnerProfile.trainings = [];
        }
        yield runnerSchema_models_1.default.findOneAndUpdate({ name: runnerName }, { $push: { trainings: trainings._id } });
        res.status(201).send(trainings);
    }
    catch (e) {
        console.log("Error from controllers", e);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createTraining = createTraining;
const runnerTrainings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainingInfo = yield trainingSchema_models_1.default.find();
        res.status(201).send(trainingInfo);
    }
    catch (e) {
        console.log("Error from controllers", e);
    }
});
exports.runnerTrainings = runnerTrainings;
const editTrainings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const IdToEdit = req.params.id;
        const newFeedback = req.body;
        const findTraining = yield trainingSchema_models_1.default.findById(IdToEdit).exec();
        const editedFeedback = yield trainingSchema_models_1.default.updateOne({ _id: IdToEdit }, { feedback: newFeedback.feedback });
        if (newFeedback.feedback !== "hard") {
            yield runnerSchema_models_1.default.updateOne({}, { $set: { "currentValues.longDistance": findTraining.distance } });
        }
        const today = new Date();
        const trainingToUpdateDistance = yield trainingSchema_models_1.default.find({
            date: {
                $gt: findTraining.date,
                $lt: today,
            },
        }).exec();
        for (let i = 0; i < trainingToUpdateDistance.length; i++) {
            const training = trainingToUpdateDistance[i];
            const id = training._id;
            yield trainingSchema_models_1.default.updateOne({ _id: id }, { $set: { distance: updateDistance(training.distance, newFeedback) } });
        }
        res.status(201).send([{ editedFeedback }]);
    }
    catch (e) {
        console.log("Error from controllers", e);
    }
});
exports.editTrainings = editTrainings;
const deleteTraining = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const toDeleteId = req.params.id;
        const runnerId = req.params.runnerId;
        const toDelete = yield trainingSchema_models_1.default.findById(toDeleteId).exec();
        if (!toDelete) {
            res.status(404).send({ message: "Training not found" });
            return;
        }
        const trainingToUpdateDistance = yield trainingSchema_models_1.default.find({
            date: { $gt: toDelete.date },
        }).exec();
        for (let i = 0; i < trainingToUpdateDistance.length; i++) {
            const training = trainingToUpdateDistance[i];
            const id = training._id;
            const currentDistance = training.distance;
            yield trainingSchema_models_1.default.updateOne({ _id: id }, {
                $set: {
                    distance: newDistance(currentDistance, training.kmToIncrease, trainingToUpdateDistance.length),
                },
            });
        }
        const trainingDeleted = yield trainingSchema_models_1.default.findByIdAndDelete(toDeleteId);
        const runnerToUpdated = yield runnerSchema_models_1.default.findById(runnerId);
        (_a = runnerToUpdated === null || runnerToUpdated === void 0 ? void 0 : runnerToUpdated.trainings) === null || _a === void 0 ? void 0 : _a.filter((ids) => ids !== toDeleteId);
        res.status(201).send({ trainingDeleted });
    }
    catch (e) {
        console.log("Error from controllers", e);
    }
});
exports.deleteTraining = deleteTraining;
