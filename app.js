const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const notFoundRouter = require('./routes/notFound');//////////
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  req.user = {
    _id: '60292b7a2790c52b08cd1146'
  };

  next();
});

app.use('/', cardsRoutes);
app.use('/', usersRoutes);
app.all('*', notFoundRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})