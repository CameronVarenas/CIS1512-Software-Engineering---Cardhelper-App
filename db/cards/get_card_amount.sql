SELECT *
FROM (
  SELECT deck_id, COUNT(card_id) AS card_amount
  FROM flashcards
  WHERE deck_id = $1
  GROUP BY deck_id
  ) flashcards
JOIN decks ON flashcards.deck_id = decks.deck_id;