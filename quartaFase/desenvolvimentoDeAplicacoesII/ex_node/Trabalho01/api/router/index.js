const express = require('express');
const router = express.Router();
const users_route = require('./users')
const students_route = require('./students')
const teachers_route = require('./teacher')
const professionals_route = require('./professionals')
const appointments_route = require('./appointments')
const events_route = require('./events')

router.use('/users', users_route);
router.use('/students', students_route);
router.use('/teachers', teachers_route);
router.use('/professionals', professionals_route);
router.use('/appointments', appointments_route);
router.use('/events', events_route);

module.exports = router;    