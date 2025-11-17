require('dotenv').config();
const express = require('express'),
      authController = require('./controllers/authController'),
      cardController = require('./controllers/cardController'),
      decksController = require('./controllers/decksController'),
      massive = require('massive'),
      session = require('express-session'),
      auth = require('./middleware/authMiddleware'),
      cors = require('cors');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();

app.use(express.json(), cors());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
}).catch(err => {
    console.log('Error connecting to db: ', err);
});

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 365},
    })
);

// auth endpoints
app.post('/auth/register', authController.register)
app.post('/auth/login', authController.login)
app.get('/auth/logout', authController.logout)
app.get('/auth/session', authController.getSession)

// card endpoints
app.get('/api/flashcards/:deck_id', auth.usersOnly, cardController.getAllFlashcards)
app.get('/api/flashcards/', auth.usersOnly, cardController.getFlashcard)
app.get('/api/card-amount/:deck_id', auth.usersOnly, cardController.getFlashcardAmount)
app.post('/api/flashcards/:deck_id', auth.usersOnly, cardController.addCard)
app.put('/api/flashcards/:card_id', auth.usersOnly, cardController.updateCard)
app.delete('/api/flashcards/:card_id', auth.usersOnly, cardController.deleteCard)

// deck endpoints
app.get('/api/decks/', auth.usersOnly, decksController.getUserDecks)
app.get('/api/decks/:deck_id', auth.usersOnly, decksController.getOneDeck)
app.post('/api/decks/', auth.usersOnly, decksController.addDeck)
app.put('/api/decks/:deck_id', auth.usersOnly, decksController.updateDeck)
app.delete('/api/decks/:deck_id', auth.usersOnly, decksController.deleteDeck)

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port: ${SERVER_PORT}`);
});