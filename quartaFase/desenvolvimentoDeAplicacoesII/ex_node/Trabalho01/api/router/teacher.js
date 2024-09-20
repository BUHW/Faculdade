const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacher');

router.get('/', teacherController.getAll);
router.get('/:id', teacherController.getById);
router.post('/', teacherController.create);
router.put('/:id', teacherController.update);
router.delete('/:id', teacherController.delete);

module.exports = router;