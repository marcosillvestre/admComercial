import bodyParser from 'body-parser';
import { Router } from 'express';
import PostConttroller from "../app/controllers/postConttroller.js";
import SessionController from "../app/controllers/sessionController.js";
import UserController from "../app/controllers/userController.js";
import auth from "../middleware/auth.js";

const routes = Router();

const corsOptions = {
    origin: "http://localhost:5173"
}


const parser = bodyParser.urlencoded({ extended: false })

routes.post('/login', SessionController.store)

routes.post('/contrato', parser, PostConttroller.sender)
routes.post('/cadastro', UserController.store)


routes.use(auth)
//rotas que precisam de autenticação
routes.post('/periodo', PostConttroller.indexPeriod)

routes.get('/', (req, res) => {
    res.send("hello world")
})

routes.get('/contrato/:unity', PostConttroller.getRecent)

routes.get('/users', UserController.index)
routes.delete('/users/:id', UserController.delete)

routes.get('/controle', PostConttroller.index)
routes.put('/controle/:id', PostConttroller.update)
routes.delete('/controle/:id', PostConttroller.delete)



export default routes
