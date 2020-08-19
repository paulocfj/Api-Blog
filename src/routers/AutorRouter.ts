import express from 'express';
import AutorController from '../controllers/AutorController';
import autorizacao from '../../middleware/autorizacao';

const autorRouter = express.Router();
const autorController = new AutorController();

autorRouter.get('/autores',  autorController.index);
autorRouter.post('/autores',  autorController.create);
autorRouter.put('/autores', autorizacao,  autorController.update);
autorRouter.delete('/autores', autorizacao, autorController.delete);

export default autorRouter;