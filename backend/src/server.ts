import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import uploadCofig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadCofig.directory));
app.use(routes);

app.get('/', (request, response) => response.json({ message: 'Hello world' }));

app.listen(3333, () => {
  console.log('Server started !!!');
});
