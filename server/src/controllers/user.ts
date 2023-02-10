import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

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
    res.status(400).send(`The email ${email} already exists`);
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
  const { userName, password } = req.body;
  //validar usuario
  const userExist: any = await User.findOne({ where: { userName: userName } });
  console.log(userExist);
  if (!userExist) {
    return res.status(400).json({
      msg: `User ${userName} not found`,
    });
  }
  if (userExist && userExist.deleted == true ) {
    return res.status(400).json({
      msg: `User ${userName} has been banned`,
    });
  }
  //validar password
  const passValid = await bcrypt.compare(password, userExist.password);
  console.log(passValid);
  if (!passValid) {
    return res.status(400).json({ msg: "Password incorrect" });
  }
  //generar token
  const token = jwt.sign(
    {
      userName: userName,
    },
    process.env.JWT_SECRET || "password123",
    { expiresIn: "1h" }
  );
  res.json({ token: token });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    console.log(user?.dataValues.deleted);
    if (user?.dataValues.deleted === true) {
      return res.status(400).json("This user does not exist");
    } else {
      await User.update(
        {
          deleted: true,
        },
        { where: { id: id } }
      );
      return res.status(200).json("User deleted succesfully");
    }
  } catch (error) {
    console.error({ error: error });
  }
};

// export const updateUser = async (req: Request, res: Response) => {
//   const
// }
export const getUsers = async (req: Request, res: Response) => {
  const listUsers = await User.findAll({
    where: {
      deleted: false,
    },
  });
  res.json(listUsers);
};
