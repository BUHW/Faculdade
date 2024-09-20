const express = require('express');
const router = express.Router();
const usersController = require('../controller/users');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);
router.post('/login', usersController.login);

module.exports = router;