import { Request, Response , NextFunction} from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

interface tokenSecret {
    secret: Secret;
}

interface Token {
    userId:  number;
    email: string;
    nome: string;
    iat: number;
    exp: number;

}

export default function Autorizacao(
    req: Request, res: Response, next: NextFunction) {
    dotenv.config();

    const {authorization} = req.headers;
    
    if(!authorization){
        console.log("entrou aqui");
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();


    try {
        const data =  jwt.verify(token, process.env.TOKEN_API as tokenSecret["secret"]);

        const { userId, email, nome } =  data as Token;
        
        req.userId = userId;
        req.email = email;
        req.nome = nome;
        
        next();

    } catch (err) {
        return res.status(401).send({
            mensagem: err
        });
    }
}