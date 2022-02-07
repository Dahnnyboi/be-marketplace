import {Application} from 'express';
import expressLoader from './express';

export default async (app: Application) => {
  await expressLoader(app);
};
