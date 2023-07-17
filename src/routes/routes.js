import { Router } from "express";
import PostConttroller from "../controllers/postConttroller.js";
import SessionController from "../controllers/sessionController.js";
import UserController from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const routes = Router();


routes.post('/login', SessionController.store)
routes.post('/webhook', PostConttroller.store)
routes.post('/contrato', PostConttroller.sender)

routes.use(auth)

routes.get('/', (req, res) => {
    res.send("hello world")
})

routes.post('/cadastro', UserController.store)
routes.get('/users', UserController.index)
routes.delete('/users/:id', UserController.delete)

routes.get('/controle', PostConttroller.index)
routes.put('/controle/:id', PostConttroller.update)
routes.delete('/controle/:id', PostConttroller.delete)



export default routes