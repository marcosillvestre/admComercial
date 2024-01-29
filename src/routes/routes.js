import bodyParser from 'body-parser';
import { Router } from 'express';
import CreateDocuments from '../app/controllers/createDocuments.js';
import PostConttroller from "../app/controllers/postConttroller.js";
import SessionController from "../app/controllers/sessionController.js";
import UnityController from "../app/controllers/unitiesController.js";
import UserController from "../app/controllers/userController.js";
import auth from "../middleware/auth.js";

const routes = Router();

// const corsOptions = {
//     origin: "http://localhost:5173"
// }



const parser = bodyParser.urlencoded({ extended: false })

routes.post('/contrato', parser, PostConttroller.sender)

routes.post('/login', SessionController.store)
routes.post('/cadastro', UserController.store)

routes.post('/redefinir-senha', SessionController.forgetPassword)

routes.post('/nova-senha', SessionController.redefinePassword)


routes.use(auth)

routes.post('/criar-contratos', CreateDocuments.store)

routes.post('/page-update', PostConttroller.searchSync)

routes.post('/grafico', PostConttroller.graphData)

routes.post('/comissao', PostConttroller.comissionData)

routes.get('/', (req, res) => {
    res.send("hello world")
})

routes.get('/unidades', UnityController.unities)
routes.post('/unidades', UnityController.storeUnities)
routes.delete('/unidades/:id', UnityController.deleteUnities)

//rotas que precisam de autenticação
routes.post('/periodo', PostConttroller.indexPeriod)


routes.get('/contrato/:unity', PostConttroller.getRecent)

routes.get('/users', UserController.index)
routes.delete('/users/:id', UserController.delete)

routes.put('/controle/:id', PostConttroller.update)
routes.delete('/controle/:id', PostConttroller.delete)

routes.put('/multi-update', PostConttroller.updateMany)

export default routes
