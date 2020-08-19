import db from '../database/connection';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

interface tokenSecret {
    secret: Secret;
}


export default class UserController {

    async login(req: Request, res: Response) {
        dotenv.config();
        const {email, senha} = req.body;

        const user = await db('autores').where('autores.email', '=', email).select('*');
        if(user.length < 1){
            return res.status(401).send({
                mensagem: "Falha na autenticação! - autor"
            });
        } 


        const result = bcrypt.compareSync(senha, user[0].senha);
        if(result) {
            const token = jwt.sign({
                userId: user[0].autorId,
                email: user[0].email,
                nome: user[0].nome
            }, 
            process.env.TOKEN_API as tokenSecret['secret'],
            {
                expiresIn: "1d"
            }
            );
            return res.status(200).send({  
                mensagem: "Autenticado com sucesso!",
                token: token,
            });
        }

        return res.status(401).send({
            mensagem: "Falha na autenticação!"
        });

    }
}