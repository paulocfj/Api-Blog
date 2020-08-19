import express from 'express';
import PostController from '../controllers/PostController';
import autorizacao from '../../middleware/autorizacao';

const postRouter = express.Router();
const postController = new PostController();

postRouter.get('/posts',  postController.index);
postRouter.post('/posts', autorizacao, postController.create);
postRouter.put('/posts/:id', autorizacao, postController.update);
postRouter.delete('/posts/:id', autorizacao, postController.delete);


export default postRouter;