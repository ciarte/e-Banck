import { Router } from "express";
import { deleteUser, getUsers, loginUser, newUser } from "../controllers/user";
import validateToken from "./validateToken";

const router = Router();

router.get("/",getUsers)

router.post("/", newUser);

router.post("/newLogin", loginUser);

router.delete("/:id", validateToken, deleteUser);

export default router;
