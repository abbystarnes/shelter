
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('handlers_pets').del()
    .then(function () {
      // Inserts seed entries
      return knex('handlers_pets').insert([
        {handlers_id: 4, pets_id: 22},
        {handlers_id: 6, pets_id: 24}
      ]);
    });
};
