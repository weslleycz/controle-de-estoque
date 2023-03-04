import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { routes } from './controllers/routes';
  const app = express();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
  });

  app.use(helmet());

  app.use(cors());

  app.use(express.json());

  app.use('/api', routes);

  app.listen(3333);

