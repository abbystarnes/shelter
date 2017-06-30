
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('handlers').del()
    .then(function () {
      // Inserts seed entries
      return knex('handlers').insert([
        {first_name: 'Solt', last_name: 'Rentas', email: 'so.renta@egl-inc.info', permission: 'foster',  hashed_pwd: '$2a$10$81HBCNnp/.kxtvCG2G5BO.pQREklYtxzaJAVLdC4e2PXiJy9qdB3.'},
        {first_name: 'Thornton', last_name: 'Starks', email: 'thorn.sta@arvinmeritor.info', permission: 'employee',  hashed_pwd: '$2a$10$81HBCNnp/.kxtvCG2G5BO.pQREklYtxzaJAVLdC4e2PXiJy9qdB3.'},
        {first_name: 'Ekta', last_name: 'Dai', email: 'ek_dai@progressenergyinc.info', permission: 'foster', hashed_pwd: '$2a$10$81HBCNnp/.kxtvCG2G5BO.pQREklYtxzaJAVLdC4e2PXiJy9qdB3.'},
        {first_name: 'Abby', last_name: 'Starnes', email: 'ordettestarnes@gmail.com', permission: 'employee', hashed_pwd: '$2a$10$81HBCNnp/.kxtvCG2G5BO.pQREklYtxzaJAVLdC4e2PXiJy9qdB3.'}
      ]);
    });
};
