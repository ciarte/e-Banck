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
// export const newProduct = async (req: Request, res: Response) => {

// }
