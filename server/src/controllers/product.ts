import { Request, Response } from "express";
import { Product } from "../models/product";

export const getProducts = async (req: Request, res: Response) => {
  const listProducts = await Product.findAll({
    where: {
      deleted: false,
    },
  });
  res.json(listProducts);
};

export const newProduct = async (req: Request, res: Response) => {
  const { coin } = req.body;
  let min = Math.pow(10, 11);
  let max = Math.ceil(9.99999999999 * Math.pow(10, 11));
  try {
    const newCode = Math.floor(1000 + Math.random() * 9000);
    const newCard = Math.floor(Math.random() * (max - min + 1)) + min;
    let card :string =''
    if (coin == "PESOS") {
      card = "4001"
    } else if(coin=="USD") {
      card = "3001"
    }
    let cardNumber = card + newCard.toString();
    const existCard = await Product.findOne({ where: { number: cardNumber } });
    if (!existCard) {
      await Product.create({
        number: cardNumber,
        code: newCode,
        description: coin,
      });
      return res.status(200).send({
        msg: `Your ${coin} card number is ${cardNumber} and your security code is ${newCode}`,
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
