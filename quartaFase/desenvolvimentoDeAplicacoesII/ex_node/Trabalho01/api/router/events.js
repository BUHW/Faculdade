const express = require('express');
const router = express.Router();
const eventsController = require('../controller/events');

router.get('/', eventsController.getAll);
router.get('/:id', eventsController.getById);
router.post('/', eventsController.create);
router.put('/:id', eventsController.update);
router.delete('/:id', eventsController.delete);

module.exports = router;