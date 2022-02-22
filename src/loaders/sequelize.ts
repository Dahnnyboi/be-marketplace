import { Sequelize } from 'sequelize';
import {
  ENVIRONMENT,
  LOCAL_DB_NAME,
  CLOUD_DB_NAME,
  LOCAL_DB_USERNAME,
  CLOUD_DB_USERNAME,
  LOCAL_DB_PASSWORD,
  CLOUD_DB_PASSWORD,
  LOCAL_DB_PORT,
  CLOUD_DB_PORT,
  LOCAL_DB_HOST,
  CLOUD_DB_HOST,
} from 'constants/environments';

const isDevelopment = ENVIRONMENT === 'development';
const dbCredentials = {
  dbName: isDevelopment ? LOCAL_DB_NAME : CLOUD_DB_NAME,
  dbUsername: isDevelopment ? LOCAL_DB_USERNAME : CLOUD_DB_USERNAME,
  dbPassword: isDevelopment ? LOCAL_DB_PASSWORD : CLOUD_DB_PASSWORD,
  dbHost: isDevelopment ? LOCAL_DB_HOST : CLOUD_DB_HOST,
  dbPort: isDevelopment ? LOCAL_DB_PORT : CLOUD_DB_PORT,
};

const { dbName, dbUsername, dbPassword, dbHost, dbPort } =
  dbCredentials;

const sequelize = new Sequelize(
  dbName || 'marketplace',
  dbUsername || 'postgres',
  dbPassword,
  {
    dialect: 'postgres', // POSTGRESQL DB
    host: dbHost,
    port: dbPort,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    query: { raw: true },
  },
);

export default sequelize;
