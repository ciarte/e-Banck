import { Router } from "express";
import { getProducts, newProduct } from "../controllers/product";
import validateToken from "./validateToken";

const router = Router();

router.get("/", validateToken, getProducts)

router.post("/",validateToken, newProduct)

export default router;