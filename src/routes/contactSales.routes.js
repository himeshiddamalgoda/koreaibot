const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactSales');

// Create a new shedule
router.post('/', controller.create);

// Retrieve all shedules
router.get('/', controller.findAll);

// Retrieve a single shedule with id
router.get('/:id', controller.findOne);

// Update a shedule with id
router.put('/:id', controller.update);

// Delete a shedule with id
router.delete('/:id', controller.delete);

module.exports = router;