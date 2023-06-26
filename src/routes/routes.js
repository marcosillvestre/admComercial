import { Router } from "express";
import SessionController from "../controllers/sessionController.js";
import UserController from "../controllers/userController.js";
const routes = Router();


routes.get('/', (req, res) => {
    res.send("deu")
})
routes.post('/login', SessionController.store)
routes.post('/cadastro', UserController.store)

export default routes