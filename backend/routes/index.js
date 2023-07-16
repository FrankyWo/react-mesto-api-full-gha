const router = require('express').Router();

const cardRouter = require('./cards');
const userRouter = require('./users');

const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { validateCreateUser, validateLogin } = require('../middlewares/validate');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
