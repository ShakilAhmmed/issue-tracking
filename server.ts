import bodyParser from 'body-parser';
import express, { Application } from 'express';
import router from './routes';
const app: Application = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/v1/', router);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
