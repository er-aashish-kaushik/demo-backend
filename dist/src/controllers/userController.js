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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersList = void 0;
const user_model_1 = require("../models/user.model");
const response_1 = require("../utils/response");
const getUsersList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectionData = {
            title: 1,
            firstName: 1,
            lastName: 1,
            gender: 1,
            role: 1,
            email: 1,
            phone: 1
        };
        const { page = 1, limit = 10 } = req.query;
        console.log(req === null || req === void 0 ? void 0 : req.user);
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const userlist = yield user_model_1.User.find({}, projectionData).skip(skip).limit(parseInt(limit));
        const totalCounts = yield user_model_1.User.countDocuments();
        (0, response_1.REQUEST_SUCCESS)(res, { data: { message: "User created successfully", data: { userlist, totalCounts } } }, 201);
    }
    catch (error) {
        console.error(error);
        (0, response_1.REQUEST_FAILURE)(res, { error: 'Internal server error' }, 500);
    }
});
exports.getUsersList = getUsersList;
