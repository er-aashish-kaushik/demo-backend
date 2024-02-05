"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const validateSignup = (req, res, next) => {
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
        return res.status(400).json({ errors: error.details });
    }
    next();
};
exports.validateSignup = validateSignup;
const validateLogin = (req, res, next) => {
    const loginSchema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
            .min(8)
            .max(32)
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }
    next();
};
exports.validateLogin = validateLogin;
