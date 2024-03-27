"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootPath = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importStar(require("express"));
const logs_1 = __importDefault(require("./utils/logs"));
const path_1 = __importDefault(require("path"));
const connection_1 = __importDefault(require("./databases/mongodb/connection"));
const filtering_client_files_1 = require("./utils/filtering-client-files");
dotenv_1.default.config();
exports.rootPath = path_1.default.join(__dirname);
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, express_1.json)());
app.use(logs_1.default);
app.use("/api/v1/", () => { });
app.use(filtering_client_files_1.filterClientFiles);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/:any", express_1.default.static(path_1.default.join(__dirname, "public", "404")));
(0, connection_1.default)().then((result) => {
    if (result.error)
        return console.error(result.message);
    app.listen(port, () => {
        console.info(`✔ server is running on port ${port}\n\n${result.message}\n\n`);
    });
});
