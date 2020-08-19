import express from  'express';
import CategoriaController from '../controllers/CategoriaController';
import autorizacao from '../../middleware/autorizacao';

const categoriaRouter = express.Router();
const categoriaController = new CategoriaController();

categoriaRouter.get('/categorias',  categoriaController.index);
categoriaRouter.post('/categorias', autorizacao, categoriaController.create);
categoriaRouter.put('/categorias/:id', autorizacao, categoriaController.update);
categoriaRouter.delete('/categorias/:id', autorizacao, categoriaController.delete);



export default categoriaRouter;