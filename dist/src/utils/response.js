"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_SUCCESS = exports.REQUEST_FAILURE = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const defaultData = {
    data: "",
    error: ""
};
const REQUEST_FAILURE = (res, resData, statusCode = 400) => {
    logger_1.default.info('request_failure::invoke');
    res.status(statusCode).json({
        success: false,
        data: resData.data || defaultData.data,
        error: resData.error || defaultData.error
    });
};
exports.REQUEST_FAILURE = REQUEST_FAILURE;
const REQUEST_SUCCESS = (res, resData, statusCode = 200) => {
    logger_1.default.info('request_success::invoke');
    res.status(statusCode).json({
        success: true,
        data: resData.data || defaultData.data,
        error: resData.error || defaultData.error
    });
};
exports.REQUEST_SUCCESS = REQUEST_SUCCESS;
