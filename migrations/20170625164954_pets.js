exports.up = function(knex, Promise) {
  return knex.schema.createTable('pets', (table) => {
    table.increments();
    table.string('status');
    table.string('age');
    table.string('size');
    table.string('breed');
    table.string('name');
    table.string('sex');
    table.text('description');
    table.integer('petID');
    table.string('type');
    table.string('photo');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pets');
};
