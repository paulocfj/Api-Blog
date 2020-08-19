import db from '../database/connection';
import {Request, Response} from 'express';

export default class CurtidaController {

    async index(req: Request, res: Response) {

        const {postId} = req.params;

        const curtidas = await db('curtidas').where({
            postId,
        }).count().select('*');

        if(curtidas.length < 1) {
            return res.status(404).send({
                mensagem: "Não há caterogias!"
            })
        }

        res.status(200).json(curtidas);
    }

    async create(req: Request, res: Response) {
        const {postId} =  req.params;

        if(!postId){
            return res.status(404).send({
                mensagem: "Post não encontrado!"
            })
        }

        const post = await db('posts').where({
            postId,
        }).select('postId');

        if(post.length < 1){
            return res.status(404).send({
                mensagem: "Post não encontrado!"
            });
        }

        try {

            await db('curtidas').insert({
                postId: postId,
                autorId: req.userId
            })

            res.status(200).send();

        } catch (err ) {
            return res.status(400).send({
                mensagem: err
            })
        }
    }


    async delete(req: Request, res: Response) {
        const {postId} =  req.params;

        if(!postId){
            return res.status(404).send({
                mensagem: "Post não encontrado!"
            })
        }

        const post = await db('posts').where({
            postId: postId
        }).select('postId');

        if(post.length < 1){
            return res.status(404).send({
                mensagem: "Post não encontrado!"
            });
        }

        try {

            await db('curtidas').where({
                postId: postId,
                autorId: req.userId
            }).del();

            res.status(201).send();

        } catch (err ) {
            return res.status(400).send({
                mensagem: err
            })
        }
    }

}