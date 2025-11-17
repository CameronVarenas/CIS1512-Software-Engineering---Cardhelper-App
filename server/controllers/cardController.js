module.exports = {
    getAllFlashcards: async (req, res) => {
        const {deck_id} = req.params;
        const db = req.app.get('db');
        const result = await db.cards.get_all_flashcards(deck_id);
        return res.status(201).send(result);
    },

    getFlashcard: async (req, res) => {
        const {card_id, deck_id} = req.query;
        const db = req.app.get('db');
        const result = await db.cards.get_flashcard(card_id, deck_id);
        return res.status(201).send(result);
    },

    getFlashcardAmount: async (req, res) => {
        const {deck_id} = req.params;
        const db = req.app.get('db');
        const result = await db.cards.get_card_amount(deck_id);
        return res.status(201).send(result);
    },

    addCard: async (req, res) => {
        const {deck_id} = req.params
        const {cardFront, cardBack} = req.body;
        const db = req.app.get('db');
        const result = await db.cards.add_card_to_deck([cardFront, cardBack, deck_id]);
        return res.status(201).send(result);
    },

    updateCard: async (req, res) => {
        const {card_id} = req.params;
        const {card_front, card_back} = req.body;
        const db = req.app.get('db');
        await db.cards.update_card([card_front, card_back, card_id]);
        return res.sendStatus(201)
    },

    deleteCard: async (req, res) => {
        const {card_id} = req.params;
        const db = req.app.get('db');
        const result = await db.cards.delete_card(card_id);
        return res.status(201).send(result);
    }
};