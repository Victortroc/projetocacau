import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable(ETableNames.user, (table) => {
        table.bigIncrements('id').primary().index();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.boolean('admin').defaultTo(false).notNullable();
        table.string('address');
        table.bigint('phone');
        table.bigint('cpf');
        table.date('birthday');
        table.decimal('balance', 10, 2).notNullable().defaultTo(0);
        table.date('createdAt').notNullable();
        table.date('updatedAt');
    })
    .then(() => {
        console.log(`Tabela ${ETableNames.user} criada!`);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(ETableNames.user);
}