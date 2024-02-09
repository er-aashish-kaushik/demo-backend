"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./config/logger"));
const db_1 = __importDefault(require("./config/database/db"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = require("./src/routes/userRoute");
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/v1/user/', userRoute_1.userRouter);
const db = mongoose_1.default.connection;
(0, db_1.default)();
app.get('/', (req, res) => {
    logger_1.default.info('GET request received');
    res.send('version: 1.0.0');
});
db.once('open', () => {
    logger_1.default.info('DB:connected:invoke');
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
        logger_1.default.info(`Server listening on port ${port}`);
    });
});
