import bodyParser from 'body-parser';
import { Router } from 'express';
import PostConttroller from "../app/controllers/postConttroller.js";
import SessionController from "../app/controllers/sessionController.js";
import UserController from "../app/controllers/userController.js";
import auth from "../middleware/auth.js";

const routes = Router();

const parser = bodyParser.urlencoded({ extended: false })

routes.post('/login', SessionController.store)

routes.post('/contrato', parser, PostConttroller.sender)
routes.post('/cadastro', UserController.store)

routes.get('/contrato/:unity', PostConttroller.getRecent)
routes.use(auth)

routes.get('/', (req, res) => {
    res.send("hello world")
})


routes.get('/users', UserController.index)
routes.delete('/users/:id', UserController.delete)

routes.get('/controle', PostConttroller.index)
routes.put('/controle/:id', PostConttroller.update)
routes.delete('/controle/:id', PostConttroller.delete)



export default routes
