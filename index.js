// Add middleware / dependencies
const express = require('express');
const db = require('./config/dbinfo');
const app = express();
const port = 80;
const jokeRouter = require('./apiserver');
const session = require('express-session');
const path = require('path');
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Use API routes
app.use('/japi', jokeRouter);

// Entry point for the web app
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });

  // Session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Static files middleware
app.use(express.static(path.join(__dirname, '/')));


// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
      return next();
  }
  res.status(401).send('Unauthorized: Please log in to access this page.');
}

// Check authentication status route
  app.get('/check-auth', (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true, username: req.session.username });
    } else {
        res.json({ loggedIn: false });
    }
  });

// Protected routes jokelist.html
app.get('/features/jokelist/jokelist.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'features/jokelist/jokelist.html'));
});

// 404 route
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <title>Page Not Found</title>
      </head>
      <body>
        <h1>The page you are trying to access does not exist.</h1>
        <p>Enjoy some jokes by going to the:</p>
        <p>Dad Jokes <a href="/">HOME</a>.</p>
      </body>
    </html>
  `);
});

// Start the Server
app.listen(port, () => {
    console.log('Server started on port 80');
  });

// npm install should be run for the first time to ensure all dependencies are installed for node.js before starting the app.
// To start the app using the standard method from the start script in the projects package.json file run:
// npm start
// Starts the nodeman tool from the dev script defined in the project’s package.json file run:
// npm run dev