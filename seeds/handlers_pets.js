
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('handlers_pets').del()
    .then(function () {
      // Inserts seed entries
      return knex('handlers_pets').insert([
        {handlers_id: 2, pets_id: 3},
        {handlers_id: 3, pets_id: 5},
        {handlers_id: 3, pets_id: 7},
        {handlers_id: 4, pets_id: 9},
        {handlers_id: 4, pets_id: 10},
        {handlers_id: 4, pets_id: 4},
      ]);
    });
};
