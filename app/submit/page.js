import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware to parse application/json
app.use(bodyParser.json());

// Middleware to set Content-Type header
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Input validation middleware
const validateInput = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Invalid username' });
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ error: 'Invalid password' });
    }
    next();
};

// Submit route with error handling
app.post('/submit', validateInput, (req, res) => {
    const { username, password } = req.body;
    // Simulating a successful submission
    res.status(200).json({ message: 'Submission successful', username });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
