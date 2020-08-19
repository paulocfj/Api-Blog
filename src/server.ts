import express from 'express';
import cors from 'cors';
import autorRouter  from './routers/AutorRouter';
import categoriaRouter from './routers/CategoriaRouter';
import postRouter from './routers/PostRouter';
import userRouter from './routers/UserRouter';
import curtidaRouter from './routers/CurtidaRouter';


const app = express();
app.use(cors());
app.use(express.json());


//localhost:3333
app.use(userRouter);
app.use(autorRouter);
app.use(categoriaRouter);
app.use(postRouter);
app.use(curtidaRouter);


app.listen(3333);
