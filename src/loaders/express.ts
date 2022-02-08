import express, { Application, Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {
  FE_LOCAL_DEVELOPMENT_URL,
  FE_STAGING_DEPLOYMENT_URL,
} from '../constants/environments';
import { API_PREFIX } from '../constants/common';

const whiteList = [
  FE_LOCAL_DEVELOPMENT_URL,
  FE_STAGING_DEPLOYMENT_URL,
];
const corsOptions = {
  origin: (origin: string | undefined, callback: OriginCallback) => {
    if (whiteList.indexOf(origin || '') !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export default (app: Application): void => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });

  // common middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(limiter);
  app.use(cookieParser());

  app.use(API_PREFIX, (req: Request, res: Response) => {
    res
      .status(200)
      .json({ message: 'Welcome to BE Marketplace API' });
  });
};
