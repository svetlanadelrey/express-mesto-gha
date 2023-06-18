const router = require('express').Router();
const { validateCreateCard, validateCardId } = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, setLike);
router.delete('/:cardId/likes', validateCardId, removeLike);

module.exports = router;