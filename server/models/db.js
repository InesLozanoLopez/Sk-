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
exports.bootstrap = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const url = 'mongodb://localhost:27017';
const dbName = 'Profilesdb';
const db = `${url}/${dbName}`;
let connection = null;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(db);
            console.log(`Mongoose connected and running`);
            return connection;
        }
        catch (e) {
            console.log('Error connecting Mongoose', e);
            throw e;
        }
    });
}
exports.bootstrap = bootstrap;
bootstrap();
exports.default = mongoose_1.default;
