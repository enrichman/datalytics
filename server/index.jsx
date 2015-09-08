import express from 'express';

const app = express();

app.use(express.static('public'));

app.listen(app.get('env') === 'development' ? 3000 : 8000);
