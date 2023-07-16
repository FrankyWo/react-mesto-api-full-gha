const router = require('express').Router();

const {
  getCards, createCard, deleteCard, setLike, deleteLike,
} = require('../controllers/cards');

const { validateCreateCard, validateCardId } = require('../middlewares/validate');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);

router.put('/:cardId/likes', validateCardId, setLike);
router.delete('/:cardId/likes', validateCardId, deleteLike);

module.exports = router;
