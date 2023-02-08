import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";

export const newUser = async (req: Request, res: Response) => {
  const { name, lastName, email, birthday, userName, password } = req.body;
  if (!name || !lastName || !email || !birthday || !userName || !password) {
    res.status(400).send("Complete all required fields");
  }
  //validamos si existe usuario o mail / edad
  const emailExist = await User.findOne({ where: { email: email } });
  const userExist = await User.findOne({ where: { userName: userName } });
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
    const hashedPass = await bcrypt.hash(password, 10);
    const formatEmail = email.toLowerCase();

    //creamos usuario nuevo
    await User.create({
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
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const{userName, password} = req.body;
  //validar usuario
  const userExist = await User.findOne({ where: { userName: userName } });
  if(!userExist){
    return res.status(400).json({
      msg: `User ${userName} not found`
    })
  }
  //validar password
  //generar token
  res.json({ msg: "login User", body: req.body });
};
