import Knex from 'knex';

export async function up(knex:Knex) {
    return knex.schema.createTable('categorias', table => {
        table.increments('categoriaId').primary();
        table.string('descricao', 20).notNullable().unique();
    });
}

export async function down(knex:Knex) {
    return knex.schema.dropTable('categorias');
}

