const Card = require('../models/card');
const User = require('../models/user');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        res.status(404).send({ message: 'Нет созданных карточек.' });
        return;
      }
      res.status(200).send(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: `Ошибка на сервере: ${err}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Введены некорректные данные.' });
        return;
      }
      res.status(500).send({ message: `Ошибка на сервере: ${err}` });
    });
};

const deleteCard = (req, res) => {
  const id = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена.' });
        return;
      }
      if (card.owner.toString() !== id) {
        res.status(404).send({ message: 'Нельзя удалить чужую карточку.' });
      } else {
        Card.findByIdAndDelete(req.params.cardId)
          // eslint-disable-next-line no-shadow
          .then((card) => {
            res.status(200).send(card);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id.' });
        return;
      }
      res.status(500).send({ message: `Ошибка на сервере: ${err}` });
    });
};

const likeCard = (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const cardId = req.params.cardId;
  User.findById(req.user._id)
    .then((user) => {
      if (user._id.toString() === cardId) {
        res.status(404).send({ message: 'Нельзя оценить свою карточку.' });
      }
      Card.findByIdAndUpdate(
        { _id: cardId },
        { $addToSet: { likes: user._id } },
        { new: true },
      )
        .then((card) => {
          res.status(200).send(card);
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            res.status(400).send({ message: 'Некорректный id карточки.' });
            return;
          }
          res.status(500).send({ message: `Ошибка на сервере: ${err}` });
        });
    });
};

const dislikeCard = (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const cardId = req.params.cardId;
  User.findById(req.user._id)
    .then((user) => {
      if (user._id.toString() === cardId) {
        res.status(404).send({ message: 'Нельзя оценить свою карточку.' });
      }
      Card.findByIdAndUpdate(
        { _id: cardId },
        { $pull: { likes: user._id } },
        { new: true },
      )
        .then((card) => {
          res.status(200).send(card);
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            res.status(400).send({ message: 'Некорректный id карточки.' });
            return;
          }
          res.status(500).send({ message: `Ошибка на сервере: ${err}` });
        });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
