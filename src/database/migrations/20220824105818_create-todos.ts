import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("todos", (table) => {
    table.string("_id").notNullable().unique().primary();
    table.string("title").notNullable();
    table.string("userId").references("users._id").notNullable();
    table.datetime("timestamp").defaultTo(knex.fn.now());
    table.string("status").defaultTo("pending");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("todos");
}
