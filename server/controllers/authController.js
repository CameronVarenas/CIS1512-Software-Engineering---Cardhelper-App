const bcrypt = require('bcrypt');

module.exports = {
    getSession: (req, res) => {
        if (req.session.user) {
            return res.status(200).send(req.session.user)
        };
        res.sendStatus(403);
    },

    register: async (req, res) => {
        const {register_username, register_email, register_password} = req.body;
        const db = req.app.get('db');
        const result = await db.users.find_user_by_username([register_username]);
        const existingUser = result[0];
        if (existingUser) {
            return res.status(409).send('Username taken');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(register_password, salt);
        const registeredUser = await db.users.create_user([register_username, register_email, hash]);
        const user = registeredUser[0];
        req.session.user = {username: user.username, email: user.email, id: user.user_id};
        return res.status(201).send(req.session.user);
    },

    login: async (req, res) => {
        const {username, password} = req.body;
        const foundUser = await req.app.get('db').users.find_user_by_username([username]);
        const user = foundUser[0];
        if(!user) {
            return res.status(401).send('User not found');
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password);
        if(!isAuthenticated) {
            return res.status(403).send('Incorrect password');
        }
        req.session.user = {username: user.username, email: user.email, id: user.user_id};
        return res.send(req.session.user);
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    }
};