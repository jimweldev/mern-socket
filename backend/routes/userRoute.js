const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');
// const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

// router.use(authMiddleware)

// get all
router.get('/', getUsers);

// get one
router.get('/:id', getUser);

// create one
router.post('/', createUser);

// delete one
router.delete('/:id', deleteUser);

// update one
router.patch('/:id', updateUser);

module.exports = router;
