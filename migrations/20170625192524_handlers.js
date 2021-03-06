exports.up = function(knex, Promise) {
  return knex.schema.createTable('handlers', (table) => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('permission');
    table.string('hashed_pwd');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('handlers');
};
