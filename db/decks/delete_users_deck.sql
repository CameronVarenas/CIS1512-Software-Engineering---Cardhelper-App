DELETE FROM flashcards
WHERE deck_id = $1;

DELETE FROM decks
WHERE deck_id = $1 AND user_id = $2;