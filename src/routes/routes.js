import { Router } from "express";
import PostConttroller from "../controllers/postConttroller.js";
import SessionController from "../controllers/sessionController.js";
import UserController from "../controllers/userController.js";
import auth from "../middleware/auth.js";
const routes = Router();


routes.post('/login', SessionController.store)
routes.post('/cadastro', UserController.store)
routes.post('/webhook', PostConttroller.store)

routes.use(auth)

routes.get('/', (req, res) => {
    res.send("hello world")
})

routes.get('/controle', PostConttroller.index)

export default routes