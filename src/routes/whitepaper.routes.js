const express = require('express');
const router = express.Router();
const whitepaperController = require('../controllers/whitepaper');

// Create a new whitepaper
router.post('/', whitepaperController.create);

// Retrieve all whitepapers
router.get('/', whitepaperController.findAll);

// Retrieve a single whitepaper with id
router.get('/:id', whitepaperController.findOne);

// Update a whitepaper with id
router.put('/:id', whitepaperController.update);

// Delete a whitepaper with id
router.delete('/:id', whitepaperController.delete);

module.exports = router;