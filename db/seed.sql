CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(25),
  email VARCHAR(80),
  password TEXT
);

CREATE TABLE decks (
  deck_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  user_id INT REFERENCES users(user_id)
);

CREATE TABLE flashcards (
  card_id SERIAL PRIMARY KEY,
  card_front TEXT,
  card_back TEXT,
  deck_id INT REFERENCES decks(deck_id)
);