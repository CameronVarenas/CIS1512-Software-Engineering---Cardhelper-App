UPDATE flashcards
SET 
card_front = $1,
card_back = $2
WHERE card_id = $3;