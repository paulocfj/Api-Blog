import Knex from 'knex';

export async function up(knex:Knex) {
    return knex.schema.createTable('curtidas', table => {
        
        table.integer('postId')
            .notNullable()
            .references('postId')
            .inTable('posts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');


        table.integer('autorId')
            .notNullable()
            .references('autorId')
            .inTable('autores')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.primary(['postId','autorId']);
    });
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('curtidas');
}

