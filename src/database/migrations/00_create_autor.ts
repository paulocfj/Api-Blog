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

