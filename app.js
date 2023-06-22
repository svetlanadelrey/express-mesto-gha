const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { loginUser, createUser } = require('./controllers/users');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { errorHandler } = require('./errors/centralized-err-handler');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(express.json());

app.post('/signin', validateLogin, loginUser);
app.post('/signup', validateCreateUser, createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.all('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует'));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
