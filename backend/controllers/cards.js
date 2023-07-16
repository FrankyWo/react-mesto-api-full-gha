const mongoose = require('mongoose');
const cardModel = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const created = require('../utils/const');

const getCards = (req, res, next) => {
  cardModel
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(created).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  cardModel
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным id не найдена'));
      } else if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Попытка удалить чужую карточку'));
      } else {
        cardModel.findByIdAndRemove(req.params.cardId)
          .then((c) => res.send(c));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

const setLike = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(new NotFoundError('Карточка с указанным id не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(new NotFoundError('Карточка с указанным id не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  deleteLike,
};
