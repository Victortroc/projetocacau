import { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(ETableNames.withdraw, (table) => {
        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('id').inTable(ETableNames.user).onDelete('CASCADE');
        table.string('nameUser').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.date('createdAt').notNullable();
        table.date('updatedAt');
        table.string('status').defaultTo('pending').notNullable();
    })
    .then(() => {
        console.log(`Tabela ${ETableNames.withdraw} criada!`);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(ETableNames.withdraw);
}

