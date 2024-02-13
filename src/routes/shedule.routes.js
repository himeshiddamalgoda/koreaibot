const express = require('express');
const router = express.Router();
const sheduleController = require('../controllers/scheduleDemo');

// Create a new shedule
router.post('/', sheduleController.create);

// Retrieve all shedules
router.get('/', sheduleController.findAll);

// Retrieve a single shedule with id
router.get('/:id', sheduleController.findOne);

// Update a shedule with id
router.put('/:id', sheduleController.update);

// Delete a shedule with id
router.delete('/:id', sheduleController.delete);

module.exports = router;