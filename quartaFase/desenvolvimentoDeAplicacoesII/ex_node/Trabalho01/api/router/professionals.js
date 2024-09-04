const express = require('express');
const router = express.Router();
const professionalsController = require('../controller/professionals');

router.get('/', professionalsController.getAll);
router.get('/:id', professionalsController.getById);
router.post('/', professionalsController.create);
router.put('/:id', professionalsController.update);
router.delete('/:id', professionalsController.delete);

module.exports = router;