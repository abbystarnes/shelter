// Update with your config settings.

module.exports = {

  test: {
    client: 'pg',
    connection: 'postgres://localhost/shelter'
  },

  development: {
    client: 'pg',
    connection: 'postgres://localhost/shelter'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
