# Blog 

  É uma Api RestFul, com o intuito de gerenciar um blog, com as funções:
  - Gerenciar Posts.
  - Gerenciar Categoria para os posts.
  - Gerenciar usuário, contudo não é foco da Api.
  - Login, com assinatura e permissão.
  - Curtir ou descurtir posts.
  O usuário poderá gerenciar vários posts.

## Tecnologias Utilizadas

### Bank end
  - Plataforma utilizada: Node.js
  - Express.Js - FrameWork para apliações Node.js
  - Linguagem: TypeScript
  - Banco de Dados: Sqlite3
  - JSON Web Token: utilizado como padrão para assinaturas
  - Knex: Query Build para Js
   

## Arquitetura do Projeto
 O projeto foi construido utilzando  os padrões de controles e rotas, com utilização de migrations para o banco de dados.

### Controles
  Os controles exercem a função de comunicar-se com o banco de dados, utilizando as funções de alterar, inserir e selecionar dados.
 
	Exemplo de Controle:




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

### Rotas 
  As rotas exercem a funcionalidade de comunicar-se via requerimento rest(Get, Post, Put, Delete), conforme o acesso permitido, elas invoncam os controles que por sua veez realizam seus metódos.

	Exemplo de Rota:
	
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



### Migrations
  São os escopos das tabelas que serão criadas no banco de dados, contudo não havendo necessidade da criação da tabela via sql.
  
  
	Exemplo de Migration: 
	
	    import Knex from 'knex';
    
    export async function up(knex:Knex) {
        return knex.schema.createTable('autores', table => {
            table.increments('autorId').primary();
            table.string('nome',50).notNullable();
            table.string('senha',30).notNullable();
            table.string('email',50).notNullable().unique();
        });
    }
    
    export async function down(knex:Knex) {
        return knex.schema.dropTable('autores');
    }
    
    

## Outros
  Agradeço por terem lido este pequeno projeto para uma api com o intuito de simular um blog, via requisições, espero que posso ter ajudado alguém com este exemplo de Api em Node.js com typeScript.
