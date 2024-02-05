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
exports.verifyToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig_1 = __importDefault(require("../../config/jwtConfig"));
const logger_1 = __importDefault(require("../../config/logger"));
const createAccessToken = (data = {}, expiresIn = jwtConfig_1.default.expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('createAccessToken::invoke');
    const token = jsonwebtoken_1.default.sign(data, jwtConfig_1.default.secret, { expiresIn: expiresIn });
    return token;
});
exports.createAccessToken = createAccessToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('verifyToken::invoke');
    const decorderToken = yield jsonwebtoken_1.default.verify(token, jwtConfig_1.default.secret);
    return decorderToken;
});
exports.verifyToken = verifyToken;
