import express from  'express';
import CurtidaController from '../controllers/CurtidaController';
import autorizacao from '../../middleware/autorizacao';

const curtidaRouter = express.Router();
const curtidaController = new CurtidaController();

curtidaRouter.get('/curtidas/:postId', curtidaController.index);
curtidaRouter.post('/curtidas/:postId', autorizacao, curtidaController.create);
curtidaRouter.delete('/curtidas/:postId', autorizacao, curtidaController.delete);



export default curtidaRouter;