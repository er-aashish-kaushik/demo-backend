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
exports.validateRefreshToken = exports.validateToken = exports.validateLogin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const auth_1 = require("../utils/auth");
const user_model_1 = require("../models/user.model");
const response_1 = require("../utils/response");
const logger_1 = __importDefault(require("../../config/logger"));
const validateSignup = (req, res, next) => {
    logger_1.default.info('signup:validateSignup:invoke');
    const signupSchema = joi_1.default.object({
        title: joi_1.default.string().required().valid('Mr.', 'Mrs.'),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        phone: joi_1.default.string().length(10).required(),
        gender: joi_1.default.string().required(),
        password: joi_1.default.string().required()
            .min(8)
            .max(32)
    });
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return (0, response_1.REQUEST_FAILURE)(res, {
            error: error.details
        });
    }
    next();
};
exports.validateSignup = validateSignup;
const validateLogin = (req, res, next) => {
    logger_1.default.info('login:validateLogin:invoke');
    const loginSchema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
            .min(8)
            .max(32)
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return (0, response_1.REQUEST_FAILURE)(res, {
            error: error.details
        });
    }
    next();
};
exports.validateLogin = validateLogin;
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    logger_1.default.info('validateToken::invoke');
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const decodedToken = yield (0, auth_1.verifyToken)(token);
        const user = yield user_model_1.User.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id);
        if (!user) {
            return (0, response_1.REQUEST_FAILURE)(res, { error: "Unauthorized" }, 401);
        }
        req['user'] = user;
        next();
    }
    catch (error) {
        console.error('Error during authentication:', error.message);
        (0, response_1.REQUEST_FAILURE)(res, { error: error.message || "Forbidden" }, 401);
    }
});
exports.validateToken = validateToken;
const validateRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('validateRefreshToken::invoke');
    const validateRefreshTokenSchema = joi_1.default.object({
        refreshToken: joi_1.default.string().required()
    });
    const { error } = validateRefreshTokenSchema.validate(req.body);
    if (error) {
        return (0, response_1.REQUEST_FAILURE)(res, {
            error: error.details
        });
    }
    next();
});
exports.validateRefreshToken = validateRefreshToken;
