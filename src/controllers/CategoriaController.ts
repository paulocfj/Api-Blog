import db from '../database/connection';
import {Request, Response} from 'express';

export default class CategoriaController {

    async index(req: Request, res: Response) {

        const categorias = await db('categorias').select('*');

        if(categorias.length == 0) {
            return res.status(400).send({
                mensagem: "Não há caterogias!"
            })
        }

        res.status(200).json(categorias);
    }

    async create(req: Request, res:Response){
        const {descricao} = req.body;

        if(!descricao){
            return res.status(400).send({
                mensagem: "Paramentros Faltando!"
            });
        }

        const categoria = await db('categorias').where('categorias.descricao', '=', descricao).select('*');
        if(categoria.length > 0){
            return res.status(401).send({
                mensagem: "Categoria já existe com esta descrição!"
            });
        }

        try {
            await db('categorias').insert({
                descricao
            });

            res.status(201).send();

        } catch (err){
            res.status(400).send({
                mensagem: err
            });
        }

    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { descricao } =  req.body;

        if(!descricao){
            return res.status(400).send({
                mensagem: "Paramentros Faltando!"
            });
        }


        const categoria = await db('categorias').where('categorias.descricao', '=', descricao).select('*');
        if(categoria.length > 0){
            return res.status(401).send({
                mensagem: "Categoria já existe com esta descrição!"
            });
        }

      
        try {
            await db('categorias').where('categoriaId', '=', id).update({
                descricao
            });

            res.status(200).send();

        } catch (err ) {
            res.status(400).send({
                mensagem: err
            });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const categoria = await db('categorias').where({
            categoriaId: id,
        }).select('categoriaId');

        if(categoria.length == 0){
            return res.status(400).send({
                mensagem: "Categoria não encontrada!"
            });
        }

        try {

            await db('categorias').where('categoriaId', '=', id).del();

            res.status(200).send();

        } catch(err ) {
            res.status(400).send({
                mensagem: err
            });
        }
    }

}