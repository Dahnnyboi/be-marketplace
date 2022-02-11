import { Application } from 'express';
import expressLoader from './express';
import sequelizeLoader from './sequelize';

export default async (app: Application) => {
  expressLoader(app);

  try {
    await sequelizeLoader.sync();
    await sequelizeLoader.authenticate();
  } catch (e) {
    console.log(e);
  }
};
