"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newProduct = exports.getProducts = void 0;
const product_1 = require("../models/product");
const getProducts = async (req, res) => {
    const listProducts = await product_1.Product.findAll({
        where: {
            deleted: false,
        },
    });
    res.json(listProducts);
};
exports.getProducts = getProducts;
const newProduct = async (req, res) => {
    const { coin } = req.body;
    let min = Math.pow(10, 11);
    let max = Math.ceil(9.99999999999 * Math.pow(10, 11));
    try {
        const newCode = Math.floor(1000 + Math.random() * 9000);
        const newCard = Math.floor(Math.random() * (max - min + 1)) + min;
        let card = '';
        if (coin == "PESOS") {
            card = "4001";
        }
        else if (coin == "USD") {
            card = "3001";
        }
        let cardNumber = card + newCard.toString();
        const existCard = await product_1.Product.findOne({ where: { number: cardNumber } });
        if (!existCard) {
            await product_1.Product.create({
                number: cardNumber,
                code: newCode,
                description: coin,
            });
            return res.status(200).send({
                msg: `Your ${coin} card number is ${cardNumber} and your security code is ${newCode}`,
            });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
};
exports.newProduct = newProduct;
