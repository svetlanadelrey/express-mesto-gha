const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { loginUser, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const NOT_FOUND = 404;

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1/mestodb');

app.use(express.json());

app.post('/signin', loginUser);
app.post('/signup', createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.all('/*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемая страница не существует' });
});

app.listen(PORT);
