import Knex from 'knex';

export async function up(knex:Knex) {
    return knex.schema.createTable('postCategorias', table => {
        
        table.integer('postId')
            .notNullable()
            .references('postId')
            .inTable('posts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');


        table.integer('categoriaId')
            .notNullable()
            .references('categoriaId')
            .inTable('categorias')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.primary(['postId','categoriaId']);
    });
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('postCategorias');
}

