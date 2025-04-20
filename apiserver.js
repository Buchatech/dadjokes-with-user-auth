const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('./config/dbinfo');
const router = express.Router();

const app = express();
app.use(express.json());
app.use(session({
    secret: 'fd9832jkdsf9238r98sdfj9238sf',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.status(401).send('Unauthorized: Please log in to access this page.');
}

// Protect jokelist.html route
app.get('/features/jokelist/jokelist.html', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/features/jokelist/jokelist.html');
});

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, hashed_password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hashedPassword], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error creating user');
            }
            res.status(201).send('User created');
        });
    } catch (error) {
        res.status(500).send('Error hashing password');
    }
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Invalid username or password');
        }
        const user = results[0];
        const match = await bcrypt.compare(password, user.hashed_password);
        if (match) {
            req.session.userId = user.id;
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.status(200).send('Logout successful');
    });
});

// Create a joke
router.post('/jokes', (req, res) => {
  let joke = req.body;
  let sql = 'INSERT INTO jokes (question, answer, rating) VALUES (?, ?, ?)';
  let values = [joke.question, joke.answer, joke.rating];
  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send('Joke has been added...');
  });
});

// All jokes
router.get('/jokes', (req, res) => {
  let sql = 'SELECT * FROM jokes';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// A single joke
router.get('/jokes/:id', (req, res) => {
  let sql = `SELECT * FROM jokes WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// A random joke
router.get('/randomjokes', (req, res) => {
  let sql = 'SELECT * FROM jokes ORDER BY RAND() LIMIT 1';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Update a joke
router.put('/jokes/:id', (req, res) => {
  let joke = req.body;
  let sql = `UPDATE jokes SET question='${joke.question}', answer='${joke.answer}', rating=${joke.rating} WHERE id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Joke updated...');
  });
});

// Delete a joke
router.delete('/jokes/:id', (req, res) => {
  let sql = `DELETE FROM jokes WHERE id=${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Joke deleted...');
  });
});

module.exports = router;

