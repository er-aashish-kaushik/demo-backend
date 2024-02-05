"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post('/signup', authMiddlewares_1.validateSignup, authController_1.signup);
userRouter.post('/login', authMiddlewares_1.validateLogin, authController_1.login);
userRouter.get('/users', authMiddlewares_1.validateToken, userController_1.getUsersList);
