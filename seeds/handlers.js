
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('handlers').del()
    .then(function () {
      // Inserts seed entries
      return knex('handlers').insert([
        {first_name: 'Solt', last_name: 'Rentas', email: 'so.renta@egl-inc.info', permission: 'foster'},
        {first_name: 'Thornton', last_name: 'Starks', email: 'thorn.sta@arvinmeritor.info', permission: 'employee'},
        {first_name: 'Ekta', last_name: 'Dai', email: 'ek_dai@progressenergyinc.info', permission: 'foster'},
        {first_name: 'Abby', last_name: 'Starnes', email: 'ordettestarnes@gmail.com', permission: 'employee'}
      ]);
    });
};
