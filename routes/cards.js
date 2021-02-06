const cardsRouter = require('express').Router();
const path = require('path');
const cardsData = path.join(__dirname, '../data/cards.json');
const fs = require('fs');

cardsRouter.get('/cards', (req, res) => {
  fs.readFile(cardsData, { encoding: 'utf8' }, (err, data) => {
    try {
      if (err) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      const newData = JSON.parse(data);
      res.send(newData);
    } catch (e) {
      console.log('error = ', e.message);
      res.status(500).send({ message: 'Ошибка на сервере' });
    }
  });
});

module.exports = cardsRouter;