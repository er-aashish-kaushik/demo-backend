"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post('/refreshToken', authMiddlewares_1.validateRefreshToken, authController_1.refreshToken);
