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
exports.deleteRunner = exports.runnerProfile = exports.createARunner = void 0;
const runnerSchema_models_1 = __importDefault(require("../models/runnerSchema.models"));
const trainingSchema_models_1 = __importDefault(require("../models/trainingSchema.models"));
const createARunner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRunner = req.body;
        const runnerProfile = yield runnerSchema_models_1.default.create({
            name: newRunner.name,
            race: {
                dateRace: newRunner.race.race.dateRace,
                distanceRace: newRunner.race.race.distanceRace,
                timeObj: newRunner.race.race.timeObj,
                minsPerKm: newRunner.race.race.minsPerKm,
            },
            currentValues: {
                longDistance: newRunner.currentValues.currentValues.longDistance,
            },
            trainingAvailability: {
                daysPerWeek: newRunner.trainingAvailability.trainingAvailability.daysPerWeek,
                daysOff: newRunner.trainingAvailability.trainingAvailability.daysOff,
                holidays: newRunner.trainingAvailability.trainingAvailability.holidays,
            },
        });
        res.status(201).send(runnerProfile);
    }
    catch (e) {
        console.log("Error from controllers", e);
        res.status(500).send("Internal Server Error");
    }
});
exports.createARunner = createARunner;
const runnerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const runnerInfo = yield runnerSchema_models_1.default.find();
        if (!runnerInfo) {
            res
                .status(400)
                .send(`There is not runners at the database, please, register a runner`);
            return;
        }
        res.status(201).send(runnerInfo);
    }
    catch (e) {
        console.log("Error from controllers");
        res.status(500).send("Internal Server Error");
    }
});
exports.runnerProfile = runnerProfile;
const deleteRunner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const toDeleteId = req.params.id;
        const toDelete = yield runnerSchema_models_1.default.findById(toDeleteId);
        if (!toDelete) {
            res.status(404).send({ message: "Runner not found" });
            return;
        }
        const trainingsId = toDelete.trainings || [];
        yield trainingSchema_models_1.default.deleteMany({ _id: { $in: trainingsId } });
        yield runnerSchema_models_1.default.findByIdAndDelete(toDeleteId);
        res.status(201).send({ toDelete });
    }
    catch (e) {
        console.log("Error from controllers", e);
        res.status(500).send("Internal Server Error");
    }
});
exports.deleteRunner = deleteRunner;
