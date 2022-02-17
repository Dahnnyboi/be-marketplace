import dotenv from 'dotenv';

dotenv.config();

export const ENVIRONMENT: EnvironmentType = process.env.NODE_ENV;
export const { FE_LOCAL_DEVELOPMENT_URL } = process.env;
export const { FE_STAGING_DEPLOYMENT_URL } = process.env;
export const SERVER_PORT = process.env.PORT || 4000;

// Local DB Credentials
export const { LOCAL_DB_NAME } = process.env;
export const { LOCAL_DB_USERNAME } = process.env;
export const { LOCAL_DB_PASSWORD } = process.env;
export const { LOCAL_DB_HOST } = process.env;
export const LOCAL_DB_PORT: number = +(
  process.env.LOCAL_DB_PORT || '5432'
);

// Cloud DB Credentials
export const { CLOUD_DB_NAME } = process.env;
export const { CLOUD_DB_USERNAME } = process.env;
export const { CLOUD_DB_PASSWORD } = process.env;
export const { CLOUD_DB_HOST } = process.env;
export const CLOUD_DB_PORT: number = +(
  process.env.CLOUD_DB_PORT || '5432'
);
