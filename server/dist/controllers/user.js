"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const newUser = async (req, res) => {
    const { name, lastName, email, birthday, userName, password } = req.body;
    if (!name || !lastName || !email || !birthday || !userName || !password) {
        res.status(400).send("Complete all required fields");
    }
    //validamos si existe usuario o mail / edad
    const emailExist = await user_1.User.findOne({ where: { email: email } });
    const userExist = await user_1.User.findOne({ where: { userName: userName } });
    const date = new Date().getFullYear();
    const age = date - birthday.slice(-4);
    if (age < 18) {
        res.status(400).send(`You have to be of legal age`);
    }
    if (userExist) {
        res.status(400).send(`The username ${userName} already exists`);
    }
    if (emailExist) {
        return res.status(400).send(`The email ${email} already exists`);
    }
    try {
        const hashedPass = await bcrypt_1.default.hash(password, 10);
        const formatEmail = email.toLowerCase();
        //creamos usuario nuevo
        await user_1.User.create({
            name,
            lastName,
            email: formatEmail,
            birthday,
            userName,
            password: hashedPass,
        });
        res
            .status(201)
            .send({ msg: `User ${name} successfully created`, body: req.body });
    }
    catch (error) {
        res.status(400).json({ error });
    }
};
exports.newUser = newUser;
const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    //validar usuario
    const userExist = await user_1.User.findOne({ where: { userName: userName } });
    if (!userExist) {
        return res.status(400).json({
            msg: `User ${userName} not found`
        });
    }
    //validar password
    //generar token
    res.json({ msg: "login User", body: req.body });
};
exports.loginUser = loginUser;
