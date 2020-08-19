import Knex from 'knex';

export async function up(knex:Knex) {
    return knex.schema.createTable('posts', table => {
        table.increments('postId').primary();
        table.string('texto').notNullable();
        table.string('titulo', 50).notNullable();

        table.timestamp('dataPostagem')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .notNullable();

        table.timestamp('dataAtualizacao')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .notNullable();


        table.integer('autorId')
            .notNullable()
            .references('autorId')
            .inTable('autores')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');


    });
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('posts');
}

