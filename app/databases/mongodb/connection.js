"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function mongoDBConnection() {
    try {
        mongoose_1.default.set("strictQuery", false);
        const databaleUrl = process.env.DATABASE;
        if (!databaleUrl)
            throw Error("Cannot find URL");
        await mongoose_1.default.connect(databaleUrl);
        return { error: false, message: "✔ MongoDB connected" };
    }
    catch (error) {
        return { error: true, message: error };
    }
}
exports.default = mongoDBConnection;
