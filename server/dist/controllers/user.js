"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.deleteUser = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        res.status(400).send(`The email ${email} already exists`);
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
    console.log(userExist);
    if (!userExist) {
        return res.status(400).json({
            msg: `User ${userName} not found`,
        });
    }
    if (userExist && userExist.deleted == true) {
        return res.status(400).json({
            msg: `User ${userName} has been banned`,
        });
    }
    //validar password
    const passValid = await bcrypt_1.default.compare(password, userExist.password);
    console.log(passValid);
    if (!passValid) {
        return res.status(400).json({ msg: "Password incorrect" });
    }
    //generar token
    const token = jsonwebtoken_1.default.sign({
        userName: userName,
    }, process.env.JWT_SECRET || "password123", { expiresIn: "1h" });
    res.json({ token: token });
};
exports.loginUser = loginUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await user_1.User.findByPk(id);
        console.log(user === null || user === void 0 ? void 0 : user.dataValues.deleted);
        if ((user === null || user === void 0 ? void 0 : user.dataValues.deleted) === true) {
            return res.status(400).json("This user does not exist");
        }
        else {
            await user_1.User.update({
                deleted: true,
            }, { where: { id: id } });
            return res.status(200).json("User deleted succesfully");
        }
    }
    catch (error) {
        console.error({ error: error });
    }
};
exports.deleteUser = deleteUser;
// export const updateUser = async (req: Request, res: Response) => {
//   const
// }
const getUsers = async (req, res) => {
    const listUsers = await user_1.User.findAll({
        where: {
            deleted: false,
        },
    });
    res.json(listUsers);
};
exports.getUsers = getUsers;
