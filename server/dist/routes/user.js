"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validateToken_1 = __importDefault(require("./validateToken"));
const router = (0, express_1.Router)();
router.get("/", user_1.getUsers);
router.post("/", user_1.newUser);
router.post("/newLogin", user_1.loginUser);
router.delete("/:id", validateToken_1.default, user_1.deleteUser);
exports.default = router;
