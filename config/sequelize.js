if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

module.exports = {
  "development": {
    "username": process.env.PG_USERNAME,
    "password": process.env.PG_PASSWORD,
    "database": process.env.DEV_DATABASE,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.PG_USERNAME,
    "password": "password",
    "database": "blood_sugar_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
  }
};
