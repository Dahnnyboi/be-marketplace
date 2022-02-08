import dotenv from 'dotenv';

dotenv.config();

export const ENVIRONMENT: ENVIRONMENT_TYPE = process.env.NODE_ENV;
export const { FE_LOCAL_DEVELOPMENT_URL } = process.env;
export const { FE_STAGING_DEPLOYMENT_URL } = process.env;
export const SERVER_PORT = process.env.PORT || 4000;
