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
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importStar(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const auth_1 = require("../utils/auth");
const response_1 = require("../utils/response");
const logger_1 = __importDefault(require("../../config/logger"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('sihnup:controller:invoke');
    try {
        const { title, firstName, lastName, gender, email, phone, password } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new user_model_1.User({ title, firstName, lastName, gender, email, phone, password: hashedPassword });
        yield user.save();
        return (0, response_1.REQUEST_SUCCESS)(res, { data: { message: "User created successfully", data: "" } }, 201);
    }
    catch (error) {
        console.error(error);
        (0, response_1.REQUEST_FAILURE)(res, { error: 'Internal server error' }, 500);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('login:controller:invoke');
    try {
        const { email, password } = req.body;
        let userData = yield user_model_1.User.findOne({ email: email });
        if (!userData) {
            (0, response_1.REQUEST_FAILURE)(res, { error: 'Invalid credentails' }, 401);
        }
        if (!((userData === null || userData === void 0 ? void 0 : userData.email) === email && (0, bcryptjs_1.compareSync)(password, userData === null || userData === void 0 ? void 0 : userData.password))) {
            (0, response_1.REQUEST_FAILURE)(res, { error: 'Invalid credentails' }, 401);
        }
        else {
            const incodeDataInAccessToken = {
                _id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone,
                role: userData.role
            };
            const incodeDataInRefreshToken = {
                _id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                phone: userData.phone
            };
            const accessToken = yield (0, auth_1.createAccessToken)(incodeDataInAccessToken);
            const refreshToken = yield (0, auth_1.createAccessToken)(incodeDataInRefreshToken);
            const userDataRes = Object.assign(Object.assign({}, incodeDataInAccessToken), { gender: userData.gender, accessToken, refreshToken });
            (0, response_1.REQUEST_SUCCESS)(res, { data: { message: "Login successfull", data: userDataRes } }, 201);
        }
    }
    catch (error) {
        console.error(error);
        (0, response_1.REQUEST_FAILURE)(res, { error: 'Internal server error' }, 500);
    }
});
exports.login = login;
