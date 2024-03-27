"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterClientFiles = void 0;
const path_1 = __importDefault(require("path"));
const __1 = require("..");
function filterClientFiles(req, res, next) {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    }
    else {
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
        res.header("Expires", "-1");
        res.header("Pragma", "no-cache");
        res.sendFile(path_1.default.join(__1.rootPath, "public", "index.html"));
    }
}
exports.filterClientFiles = filterClientFiles;
