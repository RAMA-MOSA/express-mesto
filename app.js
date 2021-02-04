const express = require('express');
const path = require('path');

const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', cardsRoutes);
app.use('/', usersRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})