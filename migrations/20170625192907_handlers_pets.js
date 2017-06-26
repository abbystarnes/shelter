
exports.up = function(knex, Promise) {
  return knex.schema.createTable('handlers_pets', (table) => {
    table.increments();
    table.integer('pets_id');
    table.integer('handlers_id');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('handlers_pets');
};
