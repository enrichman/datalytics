import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from 'config';

const app = express();

app.use(morgan('dev'));

mongoose.connect(config.databases.mongodb.uri, err => {
  if (err) process.exit(1);
});

app.use(express.static('public'));

app.listen(app.get('env') === 'development' ? config.server.port : 8000);

export default app;
