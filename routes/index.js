const routes = require('express').Router();

const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const notFoundRouter = require('./routes/notFound');

routes.use('/', cardsRoutes);
routes.use('/', usersRoutes);
routes.all('*', notFoundRouter);