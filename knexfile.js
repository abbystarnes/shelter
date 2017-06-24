// Update with your config settings.

module.exports = {

  testing: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/shelter'
    }
  },
  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/shelter'
    }
  },
  production: {
    client: 'pg',
    connection: {
      filename: 'process.env.DATABASE_URL'
    }
  }

};
