const fs = require('fs');
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.LOCAL_DB_USERNAME,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_NAME,
    host: process.env.LOCAL_DB_HOST,
    port: process.env.LOCAL_DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    dialect: 'postgres',
  },
  production: {
    username: process.env.CLOUD_DB_USERNAME,
    password: process.env.CLOUD_DB_PASSWORD,
    database: process.env.CLOUD_DB_NAME,
    host: process.env.CLOUD_DB_HOST,
    port: process.env.CLOUD_DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
