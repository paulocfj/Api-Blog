import db from '../database/connection';
import {Request, Response} from 'express';


interface PostsItem {
    autorId : number;
    postId: Number;
    texto: String;
    dataPostagem: Date;
    dataAtualizacao: Date;
    autor: String;
    titulo: String;
}

interface CategoriasItem {
    categoriaId: Number;
    descricao: String;
    postId: Number;
}


export default class PostController {

    async index(req: Request, res: Response){

            
        const posts = await db.raw('select p.*, a.nome as autor from posts p inner join autores a on p.autorId = a.autorId;');
        const postCategorias = await db.raw('select * from categorias c inner join postCategorias pc on c.categoriaId = pc.categoriaId;');

        const postLista =  posts.map((postsItem: PostsItem) => {
            var categorias  =[{}];
            postCategorias.forEach((categoriasItem:CategoriasItem) =>{
                if(postsItem.postId == categoriasItem.postId) {
                    categorias.push({descricao: categoriasItem.descricao})
                }
            });

            categorias.shift();

            return {
                postId: postsItem.postId,
                autorId: postsItem.autorId,
                texto: postsItem.texto,
                dataPostagem: postsItem.dataPostagem,
                dataAtualizacao: postsItem.dataAtualizacao,
                autor: postsItem.autor,
                titulo: postsItem.titulo,
                categorias: categorias, 
            }
        });
            
        if(posts.length == 0) {
            return res.status(400).send({
                mensagem: "Não há Posts!"
            });
        }

        res.status(200).json(postLista);

    }

   async create(req: Request, res: Response) {

        const {  categoriaId, texto, titulo} = req.body;
        

        if ( !categoriaId || !texto || !titulo) {
            return res.status(400).send({
                mensagem: "Paramtros Faltando!"
            });
        }
        
       const trx = await db.transaction();

       try {

            const posts = await trx('posts').insert({
                autorId: req.userId,
                texto,
                titulo,
            });

            const postId = posts[0];

            if (Array.isArray(categoriaId)) {
                const postsCategorias = categoriaId.map((categoriaId:Number) =>{
                    return{
                        postId,
                        categoriaId,
                    }
                })
               console.log(postsCategorias);
                await trx('postCategorias').insert(postsCategorias); 

            } else {
                const postsCategoria = await trx('postCategorias').insert({
                    postId,
                    categoriaId
                });
            }
            
           
            await trx.commit();

            res.status(201).send();
            
       } catch (err ) {
           await trx.rollback();
            res.status(400).send({
                mensagem: err
            })

       }

    }

    async update(req: Request, res: Response) {
        const { texto, titulo} = req.body;
        const {id} = req.params;

        if( !texto || !titulo) {
            return res.status(400).send({
                mensagem: "Paramentros Faltando!"
            });
        }

        const postAutor = await db('posts').where({
            postId: id
        }).select('autorId');


        if(postAutor.length < 1) {
            return res.status(404).send({
                mensagem: "Este post não existe!"
            });  
        }

        if(postAutor[0].autorId != req.userId){
            return res.status(401).send({
                mensagem: "Este usuário não tem acesso para alterar este post!"
            });
        }

        try {
            await db('posts').where({
                postId: id
            }).update({
                texto,
                titulo,
                dataAtualizacao: db.raw('CURRENT_TIMESTAMP'),
            });

            res.status(200).send();

        } catch (err ) {
            res.status(400).send({
                mensagem: err
            })
        }
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params;
        
        if(!id ) {
            return res.status(400).send({
                mensagem: "Paramentros Faltando!"
            });
        }

        const postAutor = await db('posts').where({
            postId: id
        }).select('autorId');

        if(postAutor.length < 1) {
            return res.status(404).send({
                mensagem: "Este post não existe!"
            });  
        }

        if(postAutor[0].autorId != req.userId){
            return res.status(401).send({
                mensagem: "Este usuário não tem acesso para deletar este post!"
            });
        }

        try {
            await db('posts').where('posts.postId', '=', id).del();
            res.status(200).send();
        } catch (err ){
            res.status(400).send({
                mensagem: err
            });
        }
    }
        


}