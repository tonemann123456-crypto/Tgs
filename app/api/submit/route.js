const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Input validation middleware
router.post('/submit', [
    body('data').notEmpty().withMessage('Data is required').isString().withMessage('Data must be a string'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const inputData = req.body.data;
    // Process inputData...

    return res.status(200).json({ message: 'Data submitted successfully', data: inputData });
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
