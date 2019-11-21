import Express from 'express';
import BodyParser from 'body-parser';
import CookieParser from 'cookie-parser';
import Compression from 'compression';
import router from './api/routes';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

const app = Express();

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(CookieParser());
app.use(Compression());

/**
 * Enable CORS in dev
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use('/api', router);

createConnection('default')
  .then(() => console.log('hello'))
  .catch(e => console.log(e));

app.listen(8080, () => {
  console.clear();
  console.log('*** FILET DE LUMIERE API ***');
});
