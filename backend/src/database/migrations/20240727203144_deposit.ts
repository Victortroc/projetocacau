import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(ETableNames.deposit, (table) => {
        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable().references('id').inTable(ETableNames.user).onDelete('CASCADE').onUpdate("CASCADE");
        table.string('nameUser').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.date('createdAt').notNullable();
        table.date('updatedAt');
    })
    .then(() => {
        console.log(`Tabela ${ETableNames.deposit} criada!`);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(ETableNames.deposit);
}

