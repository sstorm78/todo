exports.up = async (knex) => {
  // You are welcome to use raw SQL if that speeds things up for you
  await knex.raw(`
    CREATE TABLE tasks (
        id serial PRIMARY KEY,
        completed BOOLEAN DEFAULT FALSE,
        content   VARCHAR(500),
        created_on TIMESTAMP NOT NULL
    );
  `);
};

exports.down = async (knex) => {
  await knex.schema.dropTable('tasks');
};
