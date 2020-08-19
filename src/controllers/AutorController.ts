import db from '../database/connection';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import userRouter from '../routers/UserRouter';


interface Autor{
    senha: String;
}


export default class AutorController {
        

    async index(req: Request, res: Response) {
        const autores = await db('autores').select('nome', 'email');
        if (autores.length == 0){
            return res.status(404).send({
                mensagem: "Não há autores"
            });
        }
        return res.json(autores);
    }


    async create(req: Request, res: Response) {
        const { nome, senha, email } = req.body;

        
        if (!nome || !senha || !email) {
            return res.status(400).send({
                mensagem: "Parametros faltando!"
            });
        }

        const autor  = await db('autores').where('autores.email', '=', email).select('*');

        if(autor.length > 0){
            return res.status(401).send({
                mensagem: "Email já existe!"
            });
        }

        try{
            const salt = bcrypt.genSaltSync(10);
            const senhaIncriptada = bcrypt.hashSync(senha, salt);
            
                await db('autores').insert({
                    nome,
                    senha: senhaIncriptada,
                    email
                });
        
                res.status(201).send();
        } catch (err ){
            res.status(400).send({
                mensagem: err
            })
        }

      
    }

    async update(req: Request, res: Response) {
        const { nome, senha} = req.body;
        

        if (!nome || !senha) {
            return res.status(400).send({
                mensagem: "Parametros faltando!"
            });
        }

        console.log(req.userId);

        try{
            
            const salt = bcrypt.genSaltSync(10);
            const senhaIncriptada = bcrypt.hashSync(senha, salt);

            await db('autores').where('autores.autorId', '=', req.userId)
                .update({
                    nome,
                    senha: senhaIncriptada,
                })
            res.status(200).send();

        }catch(err ){
            res.status(400).send({
                mensagem: err
            });
        }
        
    }


    async delete(req: Request, res: Response) {
        const autor = await db('autores').where({
            autorId: req.userId
        }).select('autorId')

        if (autor.length == 0) {
            return res.status(400).send({
                mensagem: "Autor não encontrado!"
            });
        }

        try {
            await db('autores').where({
                autorId: req.userId
            }).del();
            res.status(200).send();
        } catch(err ) {
            res.status(400).send({
                mensagem: err
            });
        }
    }

   
} 