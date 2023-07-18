require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { errorsHandler } = require('./errors/errorsHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(helmet());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true })
  .then(() => console.log('Подключение к базе данных успешно'))
  .catch((err) => {
    console.log('Ошибка подключения к базе данных', err);
    process.exit(1);
  });

app.use(express.json());
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log('Сервер запущен на порту 3000');
});
